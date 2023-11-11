import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SquareService {
  private apiUrl = "https://connect.squareupsandbox.com/v2"; // Use the correct API URL

  constructor(private http: HttpClient) {}

  public createPayment(token: string, amount: number): Observable<any> {
    const headers = new HttpHeaders()
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json");

    const body = {
      source_id: "YOUR_SQUARE_LOCATION_ID", // Replace with your Square location ID
      amount_money: {
        amount: amount,
        currency: "USD",
      },
      idempotency_key: `${Math.random()}`, // Replace with a unique value for each request
    };

    return this.http.post(
      `${this.apiUrl}/locations/YOUR_SQUARE_LOCATION_ID/transactions`,
      body,
      { headers }
    );
  }
}
