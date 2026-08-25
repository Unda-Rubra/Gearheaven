// ============================================================
// 任务 1：作物大一统 —— 移除 Croptopia 作物田世界生成
// 机制：Croptopia 用 biome_modifier 引用 #croptopia:has_crop/<作物> 标签，
//       清空标签 → 作物田不再在任何群系生成
// 部署目标：<整合包>\kubejs\server_scripts\crop_removal.js
// ============================================================
ServerEvents.tags('worldgen/biome', event => {
	const crops = [
		'artichoke', 'asparagus', 'barley', 'basil', 'bellpepper', 'blackbean',
		'blackberry', 'blueberry', 'broccoli', 'cabbage', 'cantaloupe', 'cauliflower',
		'celery', 'chile_pepper', 'coffee_beans', 'corn', 'cranberry', 'cucumber',
		'currant', 'eggplant', 'elderberry', 'garlic', 'ginger', 'grape', 'greenbean',
		'greenonion', 'honeydew', 'hops', 'kale', 'kiwi', 'leek', 'lettuce', 'mustard',
		'oat', 'olive', 'onion', 'peanut', 'pepper', 'pineapple', 'radish', 'raspberry',
		'rhubarb', 'rice', 'rutabaga', 'saguaro', 'soybean', 'spinach', 'squash',
		'strawberry', 'sweetpotato', 'tea_leaves', 'tomatillo', 'tomato', 'turmeric',
		'turnip', 'vanilla', 'yam', 'zucchini'
	];
	crops.forEach(c => event.removeAll(`croptopia:has_crop/${c}`));
});
