// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface ChatResponse {
//   response: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class ChatService {
//   // private apiUrl = 'http://0.0.0.0:47179'; // Replace with your FastAPI URL if different
//   // private apiUrl = 'http://localhost:8001/chat'; // Replace with your FastAPI URL if different
//   private apiUrl = 'https://rag-zeal-backend-73d3730fcbfd.herokuapp.com/'; // Replace with your FastAPI URL if different

//   constructor(private http: HttpClient) {}

//   sendMessage(message: string): Observable<ChatResponse> {
//     const payload = { message: message };
//     return this.http.post<ChatResponse>(this.apiUrl, payload);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // private apiUrl = 'https://rag-zeal-backend-73d3730fcbfd.herokuapp.com/chat'; // Adjusted to include the correct endpoint
  private apiUrl = environment.API_CHAT_URL;

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<ChatResponse> {
    const payload = { message: message };
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Adjust headers if necessary
    return this.http.post<ChatResponse>(this.apiUrl, payload, {
      headers: headers,
    });
  }
}
