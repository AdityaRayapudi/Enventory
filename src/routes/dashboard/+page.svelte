<script>
    let ctx;
    import {Chart} from 'chart.js/auto';
	import { onMount } from 'svelte';

    onMount (() => {
        new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
    })


</script>


<div>
    <canvas bind:this={ctx} id="myChart"></canvas>
</div>

<div>Hi</div>
  