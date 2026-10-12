const SUPABASE_URL = 'https://TON-PROJET.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...ta_clé_anon...';

// Nom qui ne peut pas entrer en conflit
window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function getCurrentProfile() {
  const { data: { user } } = await window.sb.auth.getUser();
  if (!user) return null;
  const { data } = await window.sb
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  return data;
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

function toast(msg, type = 'info') {
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3800);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
