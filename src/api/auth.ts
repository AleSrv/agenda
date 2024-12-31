export async function authenticate(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === 'samsung' && password === 'promotor') {
          resolve(true);
        } else {
          resolve(false);
        }
      }, ); 
    });
  }