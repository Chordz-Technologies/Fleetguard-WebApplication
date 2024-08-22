import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  postPdfImagesData(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.url}/pdfapi/convert/`, formData);
  }

  postLabelledImageData(payload: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post<any>(`${this.url}/img2yololabels/generate-yolo-label/`, payload, { headers });
  }

  generateExcelSheet(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post<any>(`${this.url}/excelsheetapi/excelsheet/`, payload, { headers });
  }

  changePassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/user/change-password/`, data);
  }

  sendMail(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/user/forgot-password/`, data);
  }

  verifyOTP(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/user/verify-otp/`, data);
  }

  addUsers(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/user/register/`, data);
  }

  allUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}/user/list-all-users/`);
  }
}