// Weekly diet plan (Mon..Sun) tailored to user constraints:
// - Office breakfast options: idli sambhar + chutney, eggs (limit whole eggs in hot weather)
// - Morning fruit window (7–12): apple, muskmelon, watermelon, guava (no juice afterwards)
// - Lunch in office: A) regular dal-rice-chapati-paneer  B) combo paneer-quinoa-saute-veg
// - Always add curd / buttermilk / lemon water + a salad bowl
// - Snacks/dinner at home: namkeen sewai, upma, poha, chilla, parantha sabji,
//   eggs+roti, boiled egg + toast
// - User dislikes khichdi; minimize whole eggs in hot weather (uses egg whites instead)

export const HYDRATION_TIP =
  "Aim for 2.5–3 L water/day. Start with lemon water on waking.";

const breakfastRotation = [
  {
    name: "Idli Sambhar (3 pcs)",
    detail: "+ coconut chutney + 1 egg white omelette",
    macros: "~380 kcal · P 18g · C 55g · F 8g",
  },
  {
    name: "Egg White Omelette + Idli",
    detail: "3 egg whites with onion-tomato + 2 idli, mint chutney",
    macros: "~360 kcal · P 22g · C 45g · F 7g",
  },
  {
    name: "Idli Sambhar (2 pcs) + Boiled Egg",
    detail: "1 whole egg (winters) or 2 egg whites (summers)",
    macros: "~340 kcal · P 18g · C 42g · F 9g",
  },
  {
    name: "Sambhar Bowl + Egg White Bhurji",
    detail: "Sambhar with veggies, scrambled egg whites with onions",
    macros: "~350 kcal · P 24g · C 38g · F 9g",
  },
  {
    name: "Idli (2) + Sambhar + Chutney",
    detail: "Skip egg if feeling heavy; add a bowl of dal",
    macros: "~310 kcal · P 14g · C 50g · F 6g",
  },
];

const fruitMidMorning = [
  "Apple (1 medium) + 6 almonds",
  "Guava (1 medium) + black coffee",
  "Muskmelon bowl + green tea",
  "Watermelon bowl (post-walk)",
  "Apple + guava mix",
];

const lunchRotation = [
  {
    type: "Regular Plate",
    items: "2 chapati + ½ cup dal + ½ cup paneer sabji + small bowl salad",
    extras: "1 cup curd / buttermilk · pickle 1 tsp",
    macros: "~520 kcal · P 26g · C 60g · F 18g",
  },
  {
    type: "Combo Plate",
    items: "Paneer (80g) + quinoa (¾ cup) + sautéed veggies",
    extras: "Skip mayo; ask for lemon-olive dressing · buttermilk",
    macros: "~480 kcal · P 32g · C 45g · F 16g",
  },
  {
    type: "Regular Plate (light)",
    items: "1 chapati + ½ cup dal + paneer sabji + double salad",
    extras: "Lemon water + cucumber-tomato-onion-chickpea salad",
    macros: "~460 kcal · P 24g · C 48g · F 16g",
  },
  {
    type: "Combo Plate",
    items: "Paneer + quinoa + roasted veg + chickpea-beetroot salad",
    extras: "Curd (no sugar) · skip sauces; use lemon",
    macros: "~500 kcal · P 30g · C 50g · F 17g",
  },
  {
    type: "Regular Plate",
    items: "2 chapati + dal + paneer + cucumber-onion salad",
    extras: "Buttermilk · 1 tsp ghee on chapati ok",
    macros: "~520 kcal · P 26g · C 60g · F 18g",
  },
  {
    type: "Combo Plate (high protein)",
    items: "Double paneer + quinoa + sautéed veg + sprouts salad",
    extras: "Lemon water · skip mayo / cheese sauces",
    macros: "~550 kcal · P 38g · C 48g · F 18g",
  },
  {
    type: "Light Home Meal (Sunday)",
    items: "Mixed vegetable pulao (brown rice) + raita + salad",
    extras: "Skip fried papad. Add boiled chickpeas.",
    macros: "~480 kcal · P 18g · C 65g · F 14g",
  },
];

const eveningSnack = [
  "Roasted chana (30g) + green tea",
  "Buttermilk + 4 walnuts",
  "1 fruit (apple/guava) + 6 almonds",
  "Sprouts chaat (small bowl) + lemon",
  "Roasted makhana (1 cup) + chai (no sugar)",
  "Greek yogurt + chia (1 tsp)",
  "Carrot/cucumber sticks + hummus (2 tbsp)",
];

const dinnerRotation = [
  {
    name: "Poha (1 bowl) + side salad",
    detail: "Loaded with peas, peanuts (small), onion-lemon. Add 1 egg white.",
    macros: "~360 kcal · P 14g · C 50g · F 10g",
  },
  {
    name: "Besan Chilla (2) + curd",
    detail: "Stuffed with onion-tomato-coriander. Mint chutney.",
    macros: "~380 kcal · P 22g · C 42g · F 12g",
  },
  {
    name: "Upma (1 bowl) + buttermilk",
    detail: "Veggie-loaded rava upma; minimal oil. Add roasted peanuts.",
    macros: "~360 kcal · P 12g · C 52g · F 10g",
  },
  {
    name: "Paneer Bhurji + 1 Multigrain Roti",
    detail: "Paneer scrambled with onion-tomato-capsicum. Side cucumber salad.",
    macros: "~430 kcal · P 26g · C 35g · F 18g",
  },
  {
    name: "Namkeen Sewai + Salad",
    detail: "Sewai with peas & carrots; small portion. Big salad bowl.",
    macros: "~380 kcal · P 12g · C 60g · F 9g",
  },
  {
    name: "Boiled Egg(s) + Multigrain Toast",
    detail:
      "Winter: 2 whole eggs + 1 toast. Summer: 1 whole + 2 whites + 1 toast.",
    macros: "~340 kcal · P 24g · C 26g · F 12g",
  },
  {
    name: "Parantha (1) + Sabji + Curd",
    detail: "1 tsp oil, multigrain parantha; bhindi/lauki/tinda sabji.",
    macros: "~430 kcal · P 14g · C 48g · F 18g",
  },
];

// Build week plan
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const WEEK_DIET = DAY_NAMES.map((d, i) => ({
  day: d,
  breakfast: breakfastRotation[i % breakfastRotation.length],
  midMorning: fruitMidMorning[i % fruitMidMorning.length],
  lunch: lunchRotation[i % lunchRotation.length],
  evening: eveningSnack[i % eveningSnack.length],
  dinner: dinnerRotation[i % dinnerRotation.length],
}));

export const DIET_PRINCIPLES = [
  "Eat fruits before 12pm — avoid afternoon fruit juices (sugar spike).",
  "Always pair lunch with curd or buttermilk for gut health.",
  "Pick the combo plate at least 3 days/week for higher protein, lower oil.",
  "Limit whole eggs to 1/day in hot weather; use whites freely.",
  "Salad first, carbs second — fills you up and slows sugar.",
  "Stop eating 2 hours before sleep. Light dinner before 9pm if possible.",
];

export const WEEKLY_TARGETS = {
  caloriesPerDay: "1700–1900 kcal (gentle deficit for a 73kg female, sedentary→light activity)",
  protein: "90–100 g/day (≈ 1.2 g/kg)",
  steps: "6,000–8,000 steps/day",
  weightLoss: "0.4–0.6 kg/week (sustainable)",
};
