// Force this segment to render at request time (thank-you page uses search params)
export const dynamic = "force-dynamic";

export default function ThankYouLayout({ children }) {
  // #region agent log
  try {
    fetch('http://127.0.0.1:7899/ingest/98f5fc50-8397-45b4-bfca-14bf99b0e66d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'64368a'},body:JSON.stringify({sessionId:'64368a',hypothesisId:'H1',location:'thank-you/layout.js:ThankYouLayout',message:'Layout executed',data:{dynamic:'force-dynamic'},timestamp:Date.now()})}).catch(()=>{});
  } catch (_) {}
  // #endregion
  return children;
}
