exports.seed = async function (knex) {
  await knex('users').truncate();
  await knex('roles').insert([{ role: 'owner' }, { role: 'user' }]);
  await knex('users').insert([
    {
      username: 'bob',
      password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', // password "1234"
      role_id: 1,
    },
    {
      username: 'sue',
      password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', // password "1234"
      role_id: 2,
    },
  ]);
  await knex('categories').insert([
    {
      category: 'Animal Products',
    },
    {
      category: 'Beans',
    },
    {
      category: 'Cereals',
    },
    {
      category: 'Fruits',
    },
    {
      category: 'Other',
    },
    {
      category: 'Peas',
    },
    {
      category: 'Roots & Tubers',
    },
    {
      category: 'Seeds & Nuts',
    },
    {
      category: 'Vegetables',
    },
  ]);
  await knex('markets').insert([
    {
      market: 'Bungoma',
    },
    {
      market: 'Busia',
    },
    {
      market: 'Eldoret',
    },
    {
      market: 'Embu',
    },
    {
      market: 'Garisa',
    },
    {
      market: 'Garissa',
    },
    {
      market: 'Isiolo',
    },
    {
      market: 'Kajiado',
    },
    {
      market: 'Kakamega',
    },
    {
      market: 'Kisii',
    },
    {
      market: 'Kisumu',
    },
    {
      market: 'Kitale',
    },
    {
      market: 'Kitui',
    },
    {
      market: 'Loitoktok',
    },
    {
      market: 'Machakos',
    },
    {
      market: 'Makueni',
    },
    {
      market: 'Malindi',
    },
    {
      market: 'Meru',
    },
    {
      market: 'Mombasa',
    },
    {
      market: 'Nairobi',
    },
    {
      market: 'Nakuru',
    },
    {
      market: 'Oloitoktok',
    },
    {
      market: 'Wajir',
    },
  ]);
  await knex('items').insert([
    {
      item_name: 'Eggs',
      item_description: 'Cage-free, grass-fed',
      item_price: 3.5,
      category_id: 1,
      market_id: 1,
    },
    {
      item_name: 'Agwedde Beans',
      item_description:
        'Beans, beans, the magical fruit. The more you eat, the more you toot, the more you toot, the better you feel. So let us have beans for every meal!',
      item_price: 2,
      category_id: 2,
      market_id: 2,
    },
    {
      item_name: 'Dry Maize',
      item_description: 'Not as good as Cinnamon Toast Crunch',
      item_price: 5,
      category_id: 3,
      market_id: 3,
    },
  ]);
};
