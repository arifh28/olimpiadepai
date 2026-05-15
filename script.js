// === script.js ===
const SUPABASE_URL = "https://oisrtlcxdwgvzrxrlzpb.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pc3J0bGN4ZHdndnpyeHJsenBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzM3OTEsImV4cCI6MjA3ODYwOTc5MX0.aI162olkIydnJrRxLnC0NsBU9umySmd2nWSTt8Hc1ec";

// Inisialisasi Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// Fungsi untuk menyimpan Nama ke tabel 'peserta' di Supabase
async function saveUserToSupabase(userName) {
    try {
        const { error } = await supabaseClient
            .from('peserta')
            .insert([{ nama: userName }]);

        if (error) console.error("Gagal menyimpan nama ke Supabase:", error);
    } catch (err) {
        console.error("Error tak terduga:", err);
    }
}

// Fungsi untuk menyimpan Nilai ke tabel 'quiz_scores' di Supabase
async function saveScoreToSupabase(partName, score) {
    const userName = localStorage.getItem("userName");
    if (!userName) return;

    try {
        const { error } = await supabaseClient
            .from('quiz_scores')
            .insert([
                { nama: userName, bagian: partName, nilai: score }
            ]);

        if (error) {
            console.error("Gagal menyimpan nilai ke Supabase:", error);
        } else {
            console.log("Nilai berhasil disimpan ke Supabase!");
        }
    } catch (err) {
        console.error("Error tak terduga:", err);
    }
}