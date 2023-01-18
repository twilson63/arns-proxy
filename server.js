import { serve } from "https://deno.land/std/http/mod.ts";

const fileService = "https://arweave.net/x-_Owa-YMF5KGE3ng0z0uZW886IhBtCxtTL1nDRYLWs";

async function reqHandler(req) {
  const _url = new URL(req.url)
  const path = _url.pathname;
  console.log('method', req.method)
  console.log('path', path)
  if (path === '/graphql') {
    let options = { method: 'GET', headers: req.headers }
    
    if (req.method === 'POST') {
      options =  {
        method: req.method,
        headers: req.headers,
        body: await req.text()
      }
      console.log('options')
    }
    // graphql post and get
    return fetch('https://arweave.net/graphql', options).then(res => {
      const headers = new Headers(res.headers)
      headers.set('cache-control', 's-max-age=600, stale-while-revalidate=6000')

      return new Response(res.body, {
        status: res.status,
        headers
      })
    })
  }
  if (_url.host.split('.').length = 3) {
    const arns = 'pages' //_url.host.split('.')[0]
    return fetch('https://cache.permapages.app/bLAgYxAdX2Ry-nt6aH2ixgvJXbpsEYm28NgJgyqfs-U', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(['compose',
            ['prop', arns],
            ['prop', 'records']
        ])
    }).then(res => res.json()).then(res => res.result).catch(err => console.log(err))
      .then(ant => fetch('https://cache.permapages.app/' + ant, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(['compose',
          ['prop','@'],
          ['prop', 'records']
        ])
    })).then(res => res.json()).then(res => res.result)
       .then(r => typeof r === 'string' ? r : r.transactionId)
       .catch(err => console.log(err))
       .then(x => (console.log(`https://arweave.net/${x}${path}`), x))
       .then(tx => fetch('https://arweave.net/' + tx + path).then(res => {
        // disable when stable
        //return res;

        const headers = new Headers(res.headers)
        headers.set('cache-control', 's-max-age=600, stale-while-revalidate=6000')

        return new Response(res.body, {
        
        status: res.status,
        headers
        })
    }))
  }
  
  return await fetch('https://arweave.net' + path).then(res => {
    // disable when stable
    //return res;

    const headers = new Headers(res.headers)
    headers.set('cache-control', 's-max-age=600, stale-while-revalidate=6000')

    return new Response(res.body, {
      status: res.status,
      headers
    })
  });
  /*
  return Response.redirect('https://pages.arweave.dev')
  */
}
serve(reqHandler, { port: 3000 });
