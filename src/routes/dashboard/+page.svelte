<script>
    import { error } from '@sveltejs/kit';
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    
    let bounce = true;

    function scrollToNextSection() {
      const container = document.querySelector('.snap-y'); // the scroll container
      if (container) {
        container.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
    
    let showTitle = $state(false);
    let showScore = $state(false);
    let showAnalytics = $state(false);

    /**
	 * @type {any}
	 */
    let data;
    let score = $state(0);;

    // Stagger the animations
    onMount(async () => {
      try {
      const res = await fetch('/api');
      if (!res.ok) throw new Error('Failed to fetch');
      data = await res.json();
      } catch (err) {
          // error = err
          console.log("LAME ASS CODE");
          
      }

      console.log(data);
      
      score = data["totalScore"]

      // Show title immediately after mount
      setTimeout(() => {
        showTitle = true;
      }, 100);
      
      // Show score with a significant delay
      setTimeout(() => {
        showScore = true;
      }, 1500);
      
      // Show analytics title when scrolled into view
      setTimeout(() => {
        showAnalytics = true;
      }, 2000);
    });
  </script>
  
  <!-- Snap scroll container -->
  <div class="snap-y snap-mandatory h-screen overflow-y-scroll">
    <!-- First page - Score -->
    <div class="h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4 snap-start">
      {#if showTitle}
        <h1 
          class="text-3xl md:text-5xl font-bold text-gray-800 mb-8" 
          transition:fly={{ y: 50, duration: 800, opacity: 0 }}
        >
          YOUR ENVENTORY SCORE IS...
        </h1>
      {/if}
      
      {#if showScore}
        <div 
          class="text-6xl md:text-9xl font-extrabold text-emerald-600" 
          transition:fly={{ y: 50, duration: 1000, opacity: 0 }}
        >
          {score}/100
        </div>
      {/if}
      <p1 
          class="text-3s md:text-5s font-bold text-gray-800 mb-8  absolute bottom-14 left-1/2 transform -translate-x-1/2" 
          transition:fly={{ y: 50, duration: 800, opacity: 0 }}
        >
        Learn more about how you can reduce your carbon footprint
      </p1>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-12 w-12 text-gray-800 animate-bounce cursor-pointer absolute bottom-8 left-1/2 transform -translate-x-1/2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      on:click={scrollToNextSection}
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
    </div>
  
    <!-- Second page - Analytics -->
    <div class="h-screen w-full bg-green-100 p-8 relative snap-start">
      {#if showAnalytics}
        <h2 
          class="text-3xl md:text-4xl font-bold text-green-800 absolute top-8 left-8" 
          transition:fly={{ y: 30, duration: 800, opacity: 0 }}
        >
          ANALYTICS
        </h2>
      {/if}
      
      <div class="pt-24 md:pt-32 px-4 md:px-8 max-w-4xl mx-auto">
        <p class="text-lg text-green-800 mb-6">
          Below is a detailed breakdown of your Enventory performance metrics. These analytics provide insights into various aspects of your environmental impact.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white bg-opacity-70 p-6 rounded-lg shadow-sm">
            <h3 class="font-bold text-xl mb-3 text-green-700">Carbon Footprint</h3>
            <p class="text-green-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
            </p>
          </div>
          
          <div class="bg-white bg-opacity-70 p-6 rounded-lg shadow-sm">
            <h3 class="font-bold text-xl mb-3 text-green-700">Resource Usage</h3>
            <p class="text-green-800">
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
            </p>
          </div>
          
          <div class="bg-white bg-opacity-70 p-6 rounded-lg shadow-sm">
            <h3 class="font-bold text-xl mb-3 text-green-700">Sustainability Index</h3>
            <p class="text-green-800">
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in.
            </p>
          </div>
          
          <div class="bg-white bg-opacity-70 p-6 rounded-lg shadow-sm">
            <h3 class="font-bold text-xl mb-3 text-green-700">Improvement Areas</h3>
            <p class="text-green-800">
              Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    /* Enable smooth scrolling */
    :global(html) {
      scroll-behavior: smooth;
    }
    
    /* Hide scrollbar for cleaner look (optional) */
    :global(body) {
      overflow: hidden;
    }
    
    /* Hide scrollbar for Chrome, Safari and Opera */
    .snap-y::-webkit-scrollbar {
      display: none;
    }
    
    /* Hide scrollbar for IE, Edge and Firefox */
    .snap-y {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  </style>