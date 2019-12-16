export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;
  email: string;

  constructor(){
    this.image = "";
    this.name = "";
    this.email = "";
    this.provider = "";
  }
}
