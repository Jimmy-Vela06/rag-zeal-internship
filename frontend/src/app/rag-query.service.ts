import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root',
})
export class RagQueryComponent {
  // private apiUrl = 'https://rag-zeal-backend-73d3730fcbfd.herokuapp.com/';
  private apiUrl = environment.API_RAG_URL;

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<ChatResponse> {
    const payload = { message: message };
    return this.http.post<ChatResponse>(`${this.apiUrl}chat`, payload);
  }

  sendRagQuery(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}query`, payload);
  }
}
