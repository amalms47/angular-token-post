import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHandler, HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  registerUserData={}
  
  constructor(private http:HttpClient,private router : Router,private _auth:UserService) { }  
  username:string;
  password:string;
  ngOnInit() {
    
    if(localStorage.getItem('token')!=null)
    this.router.navigate(['/admin']);
    this.http.post(`http://smileeats.tk/api/profile/`,{
      headers:new HttpHeaders({'Authorization':'JWT'+localStorage.getItem('token')})
      
    })
    .subscribe(
      res=>console.log(res),
      err=>console.log(err) 
    )
 

  }

  Logout(){
    
    localStorage.removeItem('token');
    this.router.navigate['/'];
  }

  login(user){

    this.username=user.username;
    this.password=user.password; 
    this._auth.login(this.username,this.password)
    .subscribe(
      res=>{
      
        localStorage.setItem('token',res.token);
        this.router.navigate(['/admin']);
      },
      err=>console.log(err)
    )

  }



  /*
  login(user){

  this.username=user.username;
  this.password=user.password;
  
  if(this.username=='admin' && this.password=='admin'){
    this.router.navigate(['admin']);
  }
*/

  }


