// import { createClient } from '@supabase/supabase-js'
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'

// const supabase = createClient('https://kavgwiqflkublvvyffiz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthdmd3aXFmbGt1Ymx2dnlmZml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4Mzk1MjcsImV4cCI6MTk5ODQxNTUyN30.UmzSMsOBDLzfgI7qwFyzQnj9MRxHwfy6GjtF5gEWeo8')

// const AAuth = () => (
//   <Auth
//     supabaseClient={supabase}
//     appearance={{ theme: ThemeSupa }}
//     providers={['google', 'facebook', 'twitter']}
//   />
// )
//  export default AAuth;
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const supabaseUrl = 'https://kavgwiqflkublvvyffiz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthdmd3aXFmbGt1Ymx2dnlmZml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4Mzk1MjcsImV4cCI6MTk5ODQxNTUyN30.UmzSMsOBDLzfgI7qwFyzQnj9MRxHwfy6GjtF5gEWeo8';
const supabase = createClient(supabaseUrl, supabaseKey);

function AAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const { error } = await supabase.auth.signIn({
      email: email,
      password: password
    });
    if (error) {
      console.log(error);
    } else {
      history('/home');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default AAuth;
