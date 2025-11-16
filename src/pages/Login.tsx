import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [mode, setMode] = useState<'login'|'signup'>('login');

  async function submit() {
    if(mode==='login'){
      const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if(error) return alert('Login gagal: '+error.message);
      window.location.href = '/';
    } else {
      const { error } = await supabase.auth.signUp({ email, password: pass });
      if(error) return alert('Register gagal: '+error.message);
      alert('Cek email untuk verifikasi (jika diaktifkan). Silakan login.');
      setMode('login');
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-6 w-80 border rounded-xl shadow space-y-4">
        <h1 className="text-xl font-bold">{mode==='login'?'Login':'Register'}</h1>
        <input className="border p-2 w-full" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="border p-2 w-full" type="password" placeholder="Password" value={pass} onChange={(e)=>setPass(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 w-full rounded" onClick={submit}>{mode==='login'?'Login':'Register'}</button>
        <div className="text-sm text-center">
          <button className="underline" onClick={()=>setMode(mode==='login'?'signup':'login')}>{mode==='login'?'Create account':'Back to login'}</button>
        </div>
      </div>
    </div>
  );
}
