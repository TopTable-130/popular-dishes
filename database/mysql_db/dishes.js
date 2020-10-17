const dishNames = [
  'Haroset and plumcot cake',
  'Ricotta and peppercorn gyoza',
  'Fish and cod gyoza',
  'Fish and buffalo skewers',
  'Lamb and potato casserole',
  'Stilton and leek spaghetti',
  'Goat and bean curry',
  'Mascarpone and blackcurrant cheesecake',
  'Egg and cucumber sushi',
  'Game and turkey pie',
  'Treacle and stilton cupcakes',
  'Chilli and mustard seed soup',
  'Feta and napolitana pasta',
  'Celeriac and parsnip soup',
  'Apricot and butter loaf',
  'Goose and fettuccine salad',
  'Flaxseed and rice loaf',
  'Plumcot and fennel salad',
  'Fregola and italian dressing salad',
  'Potato and fish soup',
  'Soya margarine and bouquet garni salad',
  'Pigeon and stilton wontons',
  'Bean and sweetcorn risotto',
  'Tumeric and goat madras',
  'Squash and cardamom muffins',
  'Lemon and orange cupcakes',
  'Chickpea and sweetcorn pasta',
  'Buttermilk and buckwheat pancake',
  'Chicken and venison skewers',
  'Jaggery and bacon salad',
  'Apple and mint jam',
  'Navratan and tongue salad',
  'Cheddar and ginger loaf',
  'Feijoa and cod salad',
  'Courgette and pumpkin risotto',
  'Matzo farfel and saffron salad',
  'Pork and beef casserole',
  'Salt and pumpkin gnocchi',
  'Plantain and blackberry crepes',
  'Jalapeno and cucumber bagel',
  'Tomato and lamb penne',
  'Rabbit and fish casserole',
  'Kirschwasser and red leicester salad',
  'Garam masala and horseradish wontons',
  'Mandarine and clementine  salad',
  'Kalonji and star fruit salad',
  'Rhubarb and vanilla cheesecake',
  'Brie and apple ciabatta',
  'Marzipan and almond cake',
  'Coriander and leek wontons',
];

const dishIngr = ['flour | butter | egg | sugar | haroset | plumcot', 'flour | water | salt | onions | ricotta | peppercorn', 'flour | water | salt | sugar | fish | cod', 'onions | fish | buffalo', 'onion | salt | black pepper | potatoes | lamb | potato', 'tomato | passata | onion | garlic | spagetti | oregano | black pepper | stilton | leek', 'onion | peppers | garlic | ginger | tumeric | cumi…riander | curry leaf | green chilli | goat | bean', 'flour | butter | water | sugar | vanilla | double cream | cream cheese | mascarpone | blackcurrant', 'rice | rice vinegar | sugar | egg | cucumber', 'flour | butter | water | salt | onions | game | turkey', 'flour | butter | egg | sugar | treacle | stilton', 'onion | chilli | mustard seed', 'tomato | onion | garlic | pasta | oregano | black pepper | feta | napolitana', 'onion | celeriac | parsnip | cream', 'flour | salt | yeast | butter | water | sugar | apricot', 'lettuce | goose | fettuccine', 'flour | salt | yeast | butter | water | sugar | flaxseed | rice', 'lettuce | plumcot | fennel', 'tomato | cucumber | white cabbage | fregola | italian dressing', 'onion | potato | fish', 'cress | white cabbage | cucumber | soya margarine | bouquet garni', 'flour | water | salt | onions | pigeon | stilton', 'olive oil | onion | garlic | spring onions | rice | cumin | parmesan | bean | sweetcorn | cream', 'onion | peppers | garlic | ginger | tumeric | cumin | coriander | red chilli | tomato | goat', 'flour | butter | egg | sugar | squash | cardamom', 'flour | butter | egg | sugar | lemon | orange', 'tomato | onion | garlic | pasta | oregano | black pepper | chickpea | sweetcorn', 'flour | butter | egg | milk | buttermilk | buckwheat', 'onions | chicken | venison', 'lettuce | jaggery | bacon', 'flour | yeast | water | salt | sugar | oil | apple | mint', 'lettuce | navratan | tongue', 'flour | salt | yeast | butter | water | onions | cheddar | ginger', 'tomato | cucumber | cress | feijoa | cod', 'olive oil | onion | garlic | spring onions | rice | cumin | parmesan | courgette | pumpkin | cream', 'cucumber | white cabbage | lettuce | matzo farfel | saffron', 'onion | salt | black pepper | potatoes | pork | beef', 'tomato | onion | garlic | spagetti | oregano | black pepper | salt | pumpkin', 'flour | butter | egg | milk | plantain | blackberry', 'flour | yeast | water | salt | sugar | oil | jalapeno | cucumber', 'tomato | onion | garlic | pasta | oregano | black pepper | lamb', 'onion | salt | black pepper | potatoes | rabbit | fish', 'white cabbage | cress | cucumber | kirschwasser | red leicester', 'flour | water | salt | onions | garam masala | horseradish', 'lettuce | tomato | white cabbage | mandarine | clementine ', 'tomato | lettuce | white cabbage | kalonji | star fruit', 'flour | butter | water | sugar | vanilla | double cream | cream cheese | rhubarb', 'flour | yeast | water | salt | sugar | oil | brie | apple', 'flour | butter | egg | sugar | marzipan | almond', 'flour | water | salt | onions | coriander | leek'];

const refactor = (str) => str.split(' | ').join(', ');

const loop = (names, ingr) => {
  const result = [];
  for (let i = 0; i < names.length; i += 1) {
    const obj = {
      name: names[i],
      ingr: refactor(ingr[i]),
      picture: `https://dishestkout.s3-us-west-1.amazonaws.com/${i + 1}.jpeg`,
    };
    result.push(obj);
  }
  return result;
};

module.exports = loop(dishNames, dishIngr);
