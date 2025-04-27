<script>
  import { writable, get } from 'svelte/store';

  // Initialize data stores for each category
  
  const expenses = writable([{ id: 1, description: '', amount: 0 }]);
  const rawMaterials = writable([{ id: 1, material: '', country: '' }]);
  const fixedCosts = writable([{ id: 1, description: '', amount: 0 }]);
  const variableCosts = writable([{ id: 1, description: '', amount: 0 }]);
  const revenues = writable([{ id: 1, source: '', amount: 0 }]);

  // Helper function to add a new row to any category
  function addRow(store) {
    store.update(items => {
      const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
      
      if (store === rawMaterials) {
        return [...items, { id: newId, material: '', country: '' }];
      } else if (store === revenues) {
        return [...items, { id: newId, source: '', amount: 0 }];
      } else {
        return [...items, { id: newId, description: '', amount: 0 }];
      }
    });
  }

  // Helper function to remove a row from any category
  function removeRow(store, id) {
    store.update(items => items.filter(item => item.id !== id));
  }

  // Calculate totals
  $: totalExpenses = $expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  $: totalFixedCosts = $fixedCosts.reduce((sum, item) => sum + Number(item.amount), 0);
  $: totalVariableCosts = $variableCosts.reduce((sum, item) => sum + Number(item.amount), 0);
  $: totalRevenues = $revenues.reduce((sum, item) => sum + Number(item.amount), 0);
  $: totalCosts = totalExpenses + totalFixedCosts + totalVariableCosts;
  $: profit = totalRevenues - totalCosts;

  async function analysis() {
    // console.log($expenses);
    
    const data = {
     expenses: $expenses,
     fixedCosts: $fixedCosts,
     variableCosts: $variableCosts,
     revenues: $revenues,
     rawMaterials: $rawMaterials,
     totalExpenses: totalExpenses,
     totalFixedCosts: totalFixedCosts,
     totalVariableCosts: totalVariableCosts,
     totalRevenues: totalRevenues,
     totalCosts: totalCosts,
     profit: profit
   };


    const response = await fetch('/reportform', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  </script>
  
  <div class="min-h-screen bg-[#d1dbd7] py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto bg-[#f5f7f6] rounded-lg shadow-md overflow-hidden">
      <div class="px-4 py-5 sm:px-6 bg-gray-800 text-white">
        <h1 class="text-2xl font-bold">Expense Tracker</h1>
        <p class="mt-1 text-sm">Track your business expenses, costs, and revenue</p>
      </div>
  
      <div class="p-6 space-y-8">
        <!-- Expenses Section -->
        <section>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-700">Expenses</h2>
            <button 
              class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
              on:click={() => addRow(expenses)}
            >
              Add Expense
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-[#f5f7f6] divide-y divide-gray-200">
                {#each $expenses as expense (expense.id)}
                  <tr>
                    <td class="px-4 py-2">
                      <input 
                        type="text" 
                        bind:value={expense.description} 
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Expense description"
                      />
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        bind:value={expense.amount} 
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="0.00"
                      />
                    </td>
                    <td class="px-4 py-2 text-right">
                      <button 
                        class="text-red-600 hover:text-red-900"
                        on:click={() => removeRow(expenses, expense.id)}
                        disabled={$expenses.length === 1}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                {/each}
                <tr class="bg-[#d1dbd7]">
                  <td class="px-4 py-2 font-medium">Total Expenses</td>
                  <td class="px-4 py-2 font-medium">${totalExpenses.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
  
        <!-- Raw Materials Section -->
        <section>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-700">Raw Materials</h2>
            <button 
              class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
              on:click={() => addRow(rawMaterials)}
            >
              Add Material
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country of Origin</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-[#f5f7f6] divide-y divide-gray-200">
                {#each $rawMaterials as material (material.id)}
                  <tr>
                    <td class="px-4 py-2">
                      <input 
                        type="text" 
                        bind:value={material.material} 
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Material name"
                      />
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="text" 
                        bind:value={material.country} 
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Country"
                      />
                    </td>
                    <td class="px-4 py-2 text-right">
                      <button 
                        class="text-red-600 hover:text-red-900"
                        on:click={() => removeRow(rawMaterials, material.id)}
                        disabled={$rawMaterials.length === 1}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </section>
  
        <!-- Fixed Costs Section -->
        <section>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-700">Fixed Costs</h2>
            <button 
              class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
              on:click={() => addRow(fixedCosts)}
            >
              Add Fixed Cost
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-[#f5f7f6] divide-y divide-gray-200">
                {#each $fixedCosts as cost (cost.id)}
                  <tr>
                    <td class="px-4 py-2">
                      <input 
                        type="text" 
                        bind:value={cost.description} 
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Cost description"
                      />
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        bind:value={cost.amount} 
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="0.00"
                      />
                    </td>
                    <td class="px-4 py-2 text-right">
                      <button 
                        class="text-red-600 hover:text-red-900"
                        on:click={() => removeRow(fixedCosts, cost.id)}
                        disabled={$fixedCosts.length === 1}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                {/each}
                <tr class="bg-[#d1dbd7]">
                  <td class="px-4 py-2 font-medium">Total Fixed Costs</td>
                  <td class="px-4 py-2 font-medium">${totalFixedCosts.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
  
        <!-- Variable Costs Section -->
        <section>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-700">Variable Costs</h2>
            <button 
              class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
              on:click={() => addRow(variableCosts)}
            >
              Add Variable Cost
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-[#f5f7f6] divide-y divide-gray-200">
                {#each $variableCosts as cost (cost.id)}
                  <tr>
                    <td class="px-4 py-2">
                      <input 
                        type="text" 
                        bind:value={cost.description} 
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Cost description"
                      />
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        bind:value={cost.amount} 
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="0.00"
                      />
                    </td>
                    <td class="px-4 py-2 text-right">
                      <button 
                        class="text-red-600 hover:text-red-900"
                        on:click={() => removeRow(variableCosts, cost.id)}
                        disabled={$variableCosts.length === 1}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                {/each}
                <tr class="bg-[#d1dbd7]">
                  <td class="px-4 py-2 font-medium">Total Variable Costs</td>
                  <td class="px-4 py-2 font-medium">${totalVariableCosts.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
  
        <!-- Revenue Section -->
        <section>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-700">Revenue</h2>
            <button 
              class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
              on:click={() => addRow(revenues)}
            >
              Add Revenue
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-[#f5f7f6] divide-y divide-gray-200">
                {#each $revenues as revenue (revenue.id)}
                  <tr>
                    <td class="px-4 py-2">
                      <input 
                        type="text" 
                        bind:value={revenue.source} 
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Revenue source"
                      />
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        bind:value={revenue.amount} 
                        class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="0.00"
                      />
                    </td>
                    <td class="px-4 py-2 text-right">
                      <button 
                        class="text-red-600 hover:text-red-900"
                        on:click={() => removeRow(revenues, revenue.id)}
                        disabled={$revenues.length === 1}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                {/each}
                <tr class="bg-[#d1dbd7]">
                  <td class="px-4 py-2 font-medium">Total Revenue</td>
                  <td class="px-4 py-2 font-medium">${totalRevenues.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
  
        <!-- Summary Section -->
        <section class="mt-8 p-6 bg-gray-100 rounded-lg">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Summary</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="flex justify-between py-2 border-b">
                <span>Total Expenses:</span>
                <span class="font-medium">${totalExpenses.toFixed(2)}</span>
              </p>
              <p class="flex justify-between py-2 border-b">
                <span>Total Fixed Costs:</span>
                <span class="font-medium">${totalFixedCosts.toFixed(2)}</span>
              </p>
              <p class="flex justify-between py-2 border-b">
                <span>Total Variable Costs:</span>
                <span class="font-medium">${totalVariableCosts.toFixed(2)}</span>
              </p>
            </div>
            <div>
              <p class="flex justify-between py-2 border-b">
                <span>Total Costs:</span>
                <span class="font-medium">${totalCosts.toFixed(2)}</span>
              </p>
              <p class="flex justify-between py-2 border-b">
                <span>Total Revenue:</span>
                <span class="font-medium">${totalRevenues.toFixed(2)}</span>
              </p>
              <p class="flex justify-between py-2 border-b text-lg font-bold">
                <span>Profit:</span>
                <span class={profit >= 0 ? "text-green-600" : "text-red-600"}>
                  ${profit.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </section>
       <button on:click={analysis}>Analysis</button>
      </div>
    </div>
  </div>

<style>
  /* Add any additional custom styles here */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>