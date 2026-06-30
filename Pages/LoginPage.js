class LoginPage{

    constructor(page){
        this.page=page;
        this.usernameField=page.getByRole('textbox',{name:'username'});
        this.passwordField=page.getByRole('textbox',{name:'password'});
        this.loginButton=page.getByRole('button',{name:'login'});
        this.errorMessage=page.locator('[data-test="error"]');
        }


async goto (){
    await this.page.goto('https://saucedemo.com');
}   

async login (username,password){
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click(); 
}

async getErrorMessage(){

   return await this.errorMessage.textContent();
}

async isErrorVisible(){

   return await this.errorMessage.isVisible();

}

}

module.exports=LoginPage;