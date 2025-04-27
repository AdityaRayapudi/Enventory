<script>
    import { error } from '@sveltejs/kit';
    import { onMount } from 'svelte';
    import {Chart} from 'chart.js/auto';
    import { fly } from 'svelte/transition';
    
    let ctx;
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
    let data = $state({});
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
      let profitIncrease = data["profitIncrease"]
      console.log(profitIncrease);
      

      let chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Old Revenue',
            data: [{ x: 50, y: score }],
            backgroundColor: '#7dbbb2', // Green
            borderColor: '#7dbbb2',
            borderWidth: 2,
            pointRadius: 10,
            pointHoverRadius: 12
          },
          {
            label: 'New Revenue',
            data: [{ x: 50 * (1 + profitIncrease / 100), y: 90 }],
            backgroundColor: '#356965', // Blue
            borderColor: '#356965',
            borderWidth: 2,
            pointRadius: 10,
            pointHoverRadius: 12
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#6B7280',
              font: {
                weight: 'bold',
                size: 14
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: Profitability ${context.parsed.x}% | Sustainability ${context.parsed.y}%`;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Profitability (%)',
              color: '#356965',
              font: {
                weight: 'bold',
                size: 14
              }
            },
            min: 0,
            max: 100,
            grid: {
              color: '#E5E7EB',
            },
            ticks: {
              color: '#6B7280'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Sustainability (%)',
              color: '#356965',
              font: {
                weight: 'bold',
                size: 14
              }
            },
            min: 0,
            max: 100,
            grid: {
              color: '#E5E7EB',
            },
            ticks: {
              color: '#6B7280'
            }
          }
        }
      }
      });
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
          YOUR ENVIRONMENTAL SCORE IS...
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
    
    <div class="h-auto w-full bg-green-100 p-8 relative snap-start">      
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
            <canvas bind:this={ctx} height = 200px></canvas>
          </div>

          {#each data["environmentAnalysis"] as mat}
            <!-- <p>{mat}</p> -->
            <div class="bg-white bg-opacity-70 p-6 rounded-lg shadow-sm">
              <div class="flex">
                <h3 class="font-bold text-xl mb-3 text-green-700">{mat["rawMaterial"]}</h3>
                <h3 class="font-bold text-lg mb-3 text-green-700 ml-auto">Sustainability: {parseInt(mat["score"][0])}</h3>
                <!-- {#if parseInt(mat["score"][0]) > 65}
                  <h3 class="font-bold text-xl mb-3 text-green-700 ml-auto">{parseInt(mat["score"][0])}</h3>
                  {:else}
                  <h3 class="font-bold text-xl mb-3 text-red-700 ml-auto">{parseInt(mat["score"][0])}</h3>
                {/if} -->
              </div>

              {#each mat["environmentalImprovement"] as improv}
                <li class="text-green-800 mb-2">
                  {improv}
                </li>

              {/each}

            </div>
          {/each}

          {#each data["genAnalysis"] as analy}
          <!-- <p>{mat}</p> -->
          <div class="bg-white bg-opacity-70 p-6 rounded-lg shadow-sm">
            <div class="flex">
              <h3 class="font-bold text-xl mb-3 text-green-700">{analy["category"]}</h3>
              <h3 class="font-bold text-md mb-3 text-green-700 ml-auto">Profit Inc: {analy["profit"]}%</h3>
            </div>

            <li class="text-green-800 mb-2">
              {analy["improvement"]}
            </li>

            {#each analy["reason"] as reason}
            <li class="text-green-800 mb-2">
              {reason}
            </li>
            {/each}

          </div>
        {/each}
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