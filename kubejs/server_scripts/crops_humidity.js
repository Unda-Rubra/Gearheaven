// ============================================================
// 任务 4：种子湿度/季节标签补全
// 给尚无 EclipticSeasons 湿度要求的种子添加湿度 + 季节标签
// 部署目标：<整合包>\kubejs\server_scripts\crops_humidity.js
// 湿度标签：dry_average / average_moist / average_humid / moist_humid
// 季节标签：spring_autumn / spring_summer / autumn_winter / all_seasons / spring_summer_autumn
// ============================================================
ServerEvents.tags('item', event => {
	const H = {
		dry:   'eclipticseasons:crops/dry_average',
		avg:   'eclipticseasons:crops/average_moist',
		humid: 'eclipticseasons:crops/average_humid',
		wet:   'eclipticseasons:crops/moist_humid'
	};
	const S = {
		sa:  'eclipticseasons:crops/spring_autumn',
		ss:  'eclipticseasons:crops/spring_summer',
		aw:  'eclipticseasons:crops/autumn_winter',
		all: 'eclipticseasons:crops/all_seasons',
		ssa: 'eclipticseasons:crops/spring_summer_autumn'
	};

	// [物品ID, 湿度, 季节]
	const seeds = [
		// ---- FID 补充（15）----
		['flavor_immersed_daily:aniseed_0', 'dry', 'ss'],
		['flavor_immersed_daily:aubergineseedblock', 'avg', 'ssa'],
		['flavor_immersed_daily:cornseed', 'avg', 'ss'],
		['flavor_immersed_daily:cowpeabeanseed', 'avg', 'ssa'],
		['flavor_immersed_daily:cucumberseeds', 'avg', 'ss'],
		['flavor_immersed_daily:glutinousseeds', 'wet', 'ss'],
		['flavor_immersed_daily:grapeseed', 'avg', 'ssa'],
		['flavor_immersed_daily:greengrapeseed', 'avg', 'ssa'],
		['flavor_immersed_daily:kao_liang_seed', 'dry', 'ss'],
		['flavor_immersed_daily:kidneybeanseed', 'avg', 'ss'],
		['flavor_immersed_daily:loofahseed', 'wet', 'ssa'],
		['flavor_immersed_daily:paddyseeds', 'wet', 'ss'],
		['flavor_immersed_daily:pomegranate_seed', 'dry', 'ssa'],
		['flavor_immersed_daily:soy_bean_seed', 'avg', 'ss'],
		['flavor_immersed_daily:wax_gourd_seed_block', 'avg', 'ssa'],

		// ---- Croptopia（57）----
		['croptopia:artichoke_seed', 'avg', 'sa'],
		['croptopia:asparagus_seed', 'avg', 'ss'],
		['croptopia:barley_seed', 'dry', 'sa'],
		['croptopia:basil_seed', 'avg', 'ssa'],
		['croptopia:bellpepper_seed', 'avg', 'ssa'],
		['croptopia:blackbean_seed', 'dry', 'ss'],
		['croptopia:blackberry_seed', 'avg', 'ss'],
		['croptopia:blueberry_seed', 'humid', 'ss'],
		['croptopia:broccoli_seed', 'avg', 'sa'],
		['croptopia:cabbage_seed', 'avg', 'sa'],
		['croptopia:cantaloupe_seed', 'avg', 'ss'],
		['croptopia:cauliflower_seed', 'avg', 'sa'],
		['croptopia:celery_seed', 'avg', 'sa'],
		['croptopia:chile_pepper_seed', 'dry', 'ssa'],
		['croptopia:coffee_seed', 'humid', 'ssa'],
		['croptopia:corn_seed', 'avg', 'ss'],
		['croptopia:cranberry_seed', 'wet', 'ssa'],
		['croptopia:cucumber_seed', 'avg', 'ss'],
		['croptopia:currant_seed', 'avg', 'ss'],
		['croptopia:eggplant_seed', 'avg', 'ssa'],
		['croptopia:elderberry_seed', 'avg', 'ssa'],
		['croptopia:garlic_seed', 'dry', 'aw'],
		['croptopia:ginger_seed', 'wet', 'ssa'],
		['croptopia:grape_seed', 'dry', 'ssa'],
		['croptopia:greenbean_seed', 'avg', 'ss'],
		['croptopia:greenonion_seed', 'avg', 'sa'],
		['croptopia:honeydew_seed', 'avg', 'ss'],
		['croptopia:hops_seed', 'avg', 'ss'],
		['croptopia:kale_seed', 'avg', 'aw'],
		['croptopia:kiwi_seed', 'humid', 'ss'],
		['croptopia:leek_seed', 'avg', 'aw'],
		['croptopia:lettuce_seed', 'avg', 'sa'],
		['croptopia:mustard_seed', 'avg', 'sa'],
		['croptopia:oat_seed', 'dry', 'sa'],
		['croptopia:olive_seed', 'dry', 'ssa'],
		['croptopia:onion_seed', 'dry', 'sa'],
		['croptopia:peanut_seed', 'dry', 'ss'],
		['croptopia:pepper_seed', 'avg', 'ssa'],
		['croptopia:pineapple_seed', 'wet', 'all'],
		['croptopia:radish_seed', 'avg', 'sa'],
		['croptopia:raspberry_seed', 'avg', 'ss'],
		['croptopia:rhubarb_seed', 'avg', 'ss'],
		['croptopia:rice_seed', 'wet', 'ss'],
		['croptopia:rutabaga_seed', 'avg', 'aw'],
		['croptopia:saguaro_seed', 'dry', 'all'],
		['croptopia:soybean_seed', 'avg', 'ss'],
		['croptopia:spinach_seed', 'avg', 'sa'],
		['croptopia:squash_seed', 'avg', 'ss'],
		['croptopia:strawberry_seed', 'avg', 'ss'],
		['croptopia:sweetpotato_seed', 'dry', 'ssa'],
		['croptopia:tea_seed', 'humid', 'ssa'],
		['croptopia:tomatillo_seed', 'avg', 'ss'],
		['croptopia:tomato_seed', 'avg', 'ssa'],
		['croptopia:turmeric_seed', 'wet', 'ssa'],
		['croptopia:turnip_seed', 'avg', 'aw'],
		['croptopia:vanilla_seeds', 'wet', 'all'],
		['croptopia:yam_seed', 'avg', 'ssa'],
		['croptopia:zucchini_seed', 'avg', 'ss'],

		// ---- 农夫乐事（4）----
		['farmersdelight:cabbage_seeds', 'avg', 'sa'],
		['farmersdelight:tomato_seeds', 'avg', 'ssa'],
		['farmersdelight:rice', 'wet', 'ss'],
		['farmersdelight:onion', 'dry', 'sa']
	];

	seeds.forEach(([id, h, s]) => {
		event.add(H[h], id);
		event.add(S[s], id);
	});
});
