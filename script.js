const menuItems = {
  breakfast: [
    { name: "Idli", price: 30, calories: 120, image: "https://recipes.timesofindia.com/thumb/53239358.cms?imgsize=176260&width=800&height=800" },
    { name: "Dosa", price: 40, calories: 180, image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/06/brown-rice-dosa-recipe.jpg" },
    { name: "Upma", price: 35, calories: 150, image: "https://i.ytimg.com/vi/MrM30m9baBE/maxresdefault.jpg" },
    { name: "Poha", price: 30, calories: 160, image: "https://assets.telegraphindia.com/telegraph/0d4fba1b-13c9-4fdc-976c-5e8ce6eca5f3.jpg" }
  ],
  lunch: [
    { name: "Veg Thali", price: 120, calories: 550, image: "https://img.freepik.com/premium-photo/veg-thali-from-indian-cuisine-food-platter-consists-variety-veggiespaneer-dish-lentils-jeera-riceroti-sweet-dish-curd-onion-etc-selective-focus_726363-844.jpg?w=1380" },
    { name: "Paneer Butter Masala", price: 150, calories: 400, image: "https://www.funfoodfrolic.com/wp-content/uploads/2022/08/Paneer-Curry-Blog.jpg" },
    { name: "Chicken Biryani", price: 180, calories: 650, image: "https://norecipes.com/wp-content/uploads/2017/05/chicken-biryani-12-1290x1934.jpg" },
    { name: "Rajma Chawal", price: 100, calories: 450, image: "https://spicecravings.com/wp-content/uploads/2017/12/Rajma-1-720x1080.jpg" },
    { name: "Curd Rice", price: 90, calories: 200, image: "https://d36v5spmfzyapc.cloudfront.net/wp-content/uploads/2021/01/south-indian-curd-rice-2.jpg" }
  ],
  snacks: [
    { name: "Samosa", price: 20, calories: 140, image: "https://tse3.mm.bing.net/th?id=OIP.ALCEoMGuM6feD1d-LHJ_6AHaE7&pid=Api&P=0&h=180" },
    { name: "Pav Bhaji", price: 60, calories: 300, image: "https://recipes.timesofindia.com/photo/52416693.cms?imgsize=53280" },
    { name: "Sandwich", price: 50, calories: 280, image: "https://insanelygoodrecipes.com/wp-content/uploads/2023/01/Ham-and-Cheese-Sandwich-with-Tomatoes-and-Green-Salad-683x1024.jpg" },
    { name: "French Fries", price: 70, calories: 320, image: "https://goldenfingers.us/wp-content/uploads/2020/03/french_fry.jpg" },
    { name: "Pani Puri", price: 25, calories: 385, image: "https://i.pinimg.com/originals/5e/e3/bc/5ee3bcf7d3ab1002650474da1d8bbb24.jpg" }
  ],
  dinner: [
    { name: "Roti with Curry", price: 90, calories: 400, image: "https://img.freepik.com/premium-photo/roti-with-curry-chicken-soup_1339-120653.jpg" },
    { name: "Vegetable Pulao", price: 110, calories: 500, image: "https://indianhealthyrecipes.com/wp-content/uploads/2015/09/veg-pulao-recipe.jpg" },
    { name: "Dal Tadka", price: 80, calories: 350, image: "https://foodiewish.com/wp-content/uploads/2020/07/Yellow-Dal-Tadka-Recipe.jpg" },
    { name: "Mixed Veg Curry", price: 100, calories: 420, image: "https://i.ytimg.com/vi/morf2yMaCLw/maxresdefault.jpg" }
  ]
};

let cart = [];
let currentQuestions = [];

const quizPool = [
  { q: "Which of these is a healthy snack?", options: ["Chips", "Cookies", "Fruit", "Candy"], answer: "Fruit" },
  { q: "Which nutrient is most important in breakfast?", options: ["Carbs", "Protein", "Fat", "Sugar"], answer: "Protein" },
  { q: "What’s the ideal time for lunch?", options: ["9 AM", "1 PM", "6 PM", "10 PM"], answer: "1 PM" },
  { q: "What’s important for a good dinner?", options: ["Heavy food", "Light food", "No food", "Only dessert"], answer: "Light food" },
  { q: "How many meals should one ideally have per day?", options: ["1", "2", "3", "5"], answer: "3" },
  { q: "What is the benefit of fiber?", options: ["Better digestion", "More fat", "Sleepiness", "None"], answer: "Better digestion" },
  { q: "Which vitamin do you get from sunlight?", options: ["A", "B12", "D", "C"], answer: "D" },
  { q: "What’s the healthiest cooking oil?", options: ["Butter", "Olive Oil", "Palm Oil", "Ghee"], answer: "Olive Oil" }
];

function showShiftOptions() {
  document.getElementById('mainContainer').classList.add('hidden');
  document.getElementById('shiftContainer').classList.remove('hidden');
}

function generateMenu(selectedShifts) {
  const menuGrid = document.getElementById("menuGrid");
  menuGrid.innerHTML = "";
  selectedShifts.forEach(shift => {
    if (menuItems[shift]) {
      menuItems[shift].forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/150?text=Image+Not+Found'">
          <h4>${item.name}</h4>
          <p>₹${item.price} | ${item.calories} cal</p>
          <button onclick='addToCart("${shift}", ${index})'>Add to Cart</button>
        `;
        menuGrid.appendChild(card);
      });
    }
  });
}

function addToCart(shift, index) {
  const item = menuItems[shift][index];
  cart.push(item);
  updateCartSummary();
  alert(`${item.name} added to cart!`);
}

function updateCartSummary() {
  const totalCalories = cart.reduce((sum, item) => sum + item.calories, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('totalCalories').innerText = totalCalories + ' cal';
  document.getElementById('totalPrice').innerText = '₹' + totalCost.toFixed(2);
}

function startQuiz() {
  const selected = document.querySelectorAll('input[name="shift"]:checked');
  if (selected.length < 2) {
    alert("Please select at least two shifts.");
    return;
  }
  const selectedShifts = Array.from(selected).map(el => el.value);
  generateMenu(selectedShifts);
  document.getElementById('shiftContainer').classList.add('hidden');
  document.getElementById('menuContainer').classList.remove('hidden');
}

function checkout() {
  updateCartSummary();
  document.getElementById('menuContainer').classList.add('hidden');
  document.getElementById('quizContainer').classList.remove('hidden');
  generateQuiz();
}

function generateQuiz() {
  currentQuestions = [...quizPool].sort(() => 0.5 - Math.random()).slice(0, 5);
  const quizForm = document.getElementById('quizForm');
  quizForm.innerHTML = '';
  currentQuestions.forEach((q, index) => {
    const block = document.createElement('div');
    block.innerHTML = `<p><strong>${index + 1}. ${q.q}</strong></p>`;
    q.options.forEach(opt => {
      block.innerHTML += `
        <label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br>`;
    });
    quizForm.appendChild(block);
  });
}

function calculateDiscount() {
  let score = 0;
  for (let i = 0; i < currentQuestions.length; i++) {
    const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
    if (selectedOption && selectedOption.value === currentQuestions[i].answer) {
      score++;
    }
  }

  let discount = 0;
  if (score >= 4) discount = 50;
  else if (score >= 3) discount = 30;
  else if (score >= 2) discount = 10;

  const totalCost = cart.reduce((sum, item) => sum + item.price, 0);
  const discountedPrice = totalCost - (totalCost * discount / 100);

  const msg = discount > 0
    ? `🎉 You scored ${score}/5! You get a ${discount}% discount. Final Price: ₹${discountedPrice.toFixed(2)}`
    : `You scored ${score}/5. No discount, Final Price: ₹${totalCost.toFixed(2)}`;

  document.getElementById('quizContainer').classList.add('hidden');
  document.getElementById('resultContainer').classList.remove('hidden');
  document.getElementById('discountMsg').innerText = msg;
  document.getElementById('finalBill').innerText = discount > 0 ? discountedPrice.toFixed(2) : totalCost.toFixed(2);
}

window.onload = function () {
  cart = [];
  currentQuestions = [];
  document.getElementById('mainContainer')?.classList.remove('hidden');
  document.getElementById('shiftContainer')?.classList.add('hidden');
  document.getElementById('menuContainer')?.classList.add('hidden');
  document.getElementById('quizContainer')?.classList.add('hidden');
  document.getElementById('resultContainer')?.classList.add('hidden');
  document.getElementById('totalCalories').innerText = '0 cal';
  document.getElementById('totalPrice').innerText = '₹0';
};
