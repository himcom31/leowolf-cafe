// Photos: public/images/ folder mein rakhi hain. Agar file missing hai to
// PopularPicks/PlateArt automatically emoji dikha deta hai (koi broken image nahi aayegi).
export const categories = ["All", "Coffee", "Tea", "Snacks", "Desserts"];

export const menu = [
  { id: 1, name: "Cappuccino", category: "Coffee", price: 160, veg: true, popular: true, emoji: "☕", image: "/images/cappuccino.webp", desc: "Rich espresso with silky steamed milk foam." },
  { id: 2, name: "Cold Coffee", category: "Coffee", price: 180, veg: true, popular: true, emoji: "🧋", image: "/images/cold-coffee.webp", desc: "Chilled, creamy and blended with ice cream." },
  { id: 3, name: "Caffe Latte", category: "Coffee", price: 170, veg: true, popular: false, emoji: "🥛", image: "/images/caffe-latte.webp", desc: "Smooth espresso mellowed with steamed milk." },
  { id: 4, name: "Hazelnut Mocha", category: "Coffee", price: 210, veg: true, popular: false, emoji: "🍫", image: "/images/hazelnut-mocha.webp", desc: "Espresso, chocolate and hazelnut syrup." },
  { id: 5, name: "Masala Chai", category: "Tea", price: 80, veg: true, popular: true, emoji: "🫖", image: "/images/masala-chai.webp", desc: "Desi chai with ginger, elaichi and fresh tulsi." },
  { id: 6, name: "Lemon Iced Tea", category: "Tea", price: 120, veg: true, popular: false, emoji: "🍋", image: "/images/lemon-iced-tea.webp", desc: "Refreshing black tea with lemon and mint." },
  { id: 7, name: "Green Tea", category: "Tea", price: 100, veg: true, popular: false, emoji: "🍵", image: "/images/green-tea.webp", desc: "Light, healthy and freshly brewed." },
  { id: 8, name: "Veg Grilled Sandwich", category: "Snacks", price: 140, veg: true, popular: true, emoji: "🥪", image: "/images/veg-grilled-sandwich.webp", desc: "Loaded with veggies and cheese, grilled crisp." },
  { id: 9, name: "Peri Peri Fries", category: "Snacks", price: 130, veg: true, popular: false, emoji: "🍟", image: "/images/peri-peri-fries.webp", desc: "Crispy fries tossed in spicy peri peri masala." },
  { id: 10, name: "Chicken Burger", category: "Snacks", price: 190, veg: false, popular: false, emoji: "🍔", image: "/images/chicken-burger.webp", desc: "Juicy crispy chicken patty with house sauce." },
  { id: 11, name: "Chocolate Brownie", category: "Desserts", price: 150, veg: true, popular: true, emoji: "🍰", image: "/images/chocolate-brownie.webp", desc: "Warm fudgy brownie with chocolate drizzle." },
  { id: 12, name: "Blueberry Cheesecake", category: "Desserts", price: 220, veg: true, popular: false, emoji: "🧁", image: "/images/blueberry-cheesecake.webp", desc: "Creamy baked cheesecake with blueberry topping." },
];