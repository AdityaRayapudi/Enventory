<script>
    // Placeholder for navigation or actions
    function handleGetStarted() {
        alert('Redirecting to the app...');
    }
</script>

<main class="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
    <header class="text-4xl font-bold mb-4">Welcome to Enventory</header>
    <p class="text-lg text-center mb-6">
        Effortlessly manage your inventory and track your expenses in one place.
    </p>
    <button 
        on:click={handleGetStarted}
        class="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
    >
        Get Started
    </button>
</main>