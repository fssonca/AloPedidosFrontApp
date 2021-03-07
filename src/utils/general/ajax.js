export const ajax = {
  GET: async (url) => {
    const req = await fetch(`http://192.168.0.102:3000/api/app/${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await req.json();
  },

  POST: async (url, params) => {
    // const req = await fetch(`${process.env.URL_API + url}`, {
    const req = await fetch(`http://192.168.0.102:3000/api/app/${url}`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await req.json();
  },
};
