<script>
    import { goto } from '$app/navigation'; // Import SvelteKit's navigation function
    import { onMount } from 'svelte'; // Import onMount for page load animation

    let isExiting = false; // State to track if the page is transitioning out

    function handleGetStarted() {
        isExiting = true; // Trigger the fade-out animation
        setTimeout(() => {
            goto('/reportform'); // Redirect to the reportform page after animation
        }, 500); // Match the duration of the fade-out animation
    }
</script>

<main class="relative flex flex-col items-center justify-center min-h-screen text-gray-800 bg-cover bg-center transition-opacity duration-500" style="background-image: url('image.png');" class:fade-out={isExiting}>
    <!-- Navbar -->
    <nav class="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4">
        <!-- Logo -->
        <div class="flex items-center animate-fade-up">
            <img src="ENVENT.png" alt="Logo" class="px-33 mt-2.5 h-12 scale-700 w-auto">
        </div>
        <!-- Navigation Links -->
        <div class="flex space-x-6 animate-fade-up">
            <a href="#" class="text-gray-800 hover:text-blue-500 transition">Dashboard</a>

        </div>
    </nav>
    <header class="text-7xl font-bold mb-4 px-4 py-2 rounded-lg text-shadow-md animate-fade-up">
        Welcome to Enventory
    </header>
    <p class="text-3xl text-center mb-6 px-4 py-2 rounded-lg text-grey text-shadow-md animate-fade-up">
        Analyze your business expenses and reduce your environmental impact with our secret formula.
    </p> 
    <p class="text-3xl text-center mb-10 px-4 py-2 rounded-lg text-grey text-shadow-md  animate-fade-up">
        Sustainability = (S + C + P) x 7
    </p>
    <button 
        on:click={handleGetStarted}
        class="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition animate-fade-up"
    >
        Get Started
    </button>
</main>

<style>
    /* Custom fade-up animation */
    @keyframes fade-up {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-up {
        animation: fade-up 1s ease-out;
    }

    /* Smooth hover effect for the button */
    button:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }

    /* Fade-out animation for page transition */
    .fade-out {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
</style>