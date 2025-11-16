
export async function getESPData(){
 try{
  const r=await fetch('http://localhost:3001/api/data');
  return await r.json();
 }catch(e){return null;}
}
export async function ingest(p){
 try{
  const r=await fetch('http://localhost:3001/api/ingest',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)});
  return await r.json();
 }catch(e){return null;}
}
