import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from 'src/app/_models/group.model';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  public environment = environment

  constructor(
    private http: HttpClient
  ) { }

  removeGroupMember(userId: number, groupId: number): Observable<any> {
    return this.http.delete(`${this.environment.api}/membership/${groupId}/members/${userId}/remove`)
  }
  joinGroup(userId: number, groupId: number): Observable<any> {
    return this.http.post(`${this.environment.api}/membership/joinGroup`, {
      "user_id": userId,
      "group_id": groupId
    })
  }

  createNewGroup(name: string): Observable<any> {
    return this.http.post(`${this.environment.api}/groups`, { name: name })
  }

  updateGroup(group: Group):Observable<any> {
    return this.http.patch(`${this.environment.api}/groups/${group.id}`, group)
  }
}
