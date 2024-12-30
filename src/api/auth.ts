export async function authenticate(username: string, password: string): Promise<boolean> {
    // Simula una llamada a un backend para validar las credenciales
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'password') {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000); // Simula un retraso de 1 segundo
    });
  }