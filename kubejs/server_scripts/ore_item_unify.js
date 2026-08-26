// ============================================================
// 矿物物品统一（配方层）—— 替代 OEI 物品替换方案
// 背景：OEI 全局替换会把多家的同材料物品映射成同一 ID，
//       在创造模式标签页重建时触发 "already exists in the tab's list"
//       判重崩溃（13:31 steel_block / 13:39 steel_ingot 两次实测）。
// 本方案：只替换配方的原料与产物引用，不动物品本体 → 标签页零冲突。
// 方块世界层仍由 OEB 负责（config/oeb/ore_unification.json）。
// 目标选择：宝石=irons_jewelry / 银系=silentgems / 钢与铸铁=tfmg /
//          青铜=silentgear（服务任务3 寂静工具适配）/ 铜粒与黑曜石粉=create
// ============================================================
ServerEvents.recipes(event => {
	const groups = [
		// [胜出物品, [被统一物品...]]
		['irons_jewelry:ruby',            ['silentgems:ruby']],
		['irons_jewelry:sapphire',        ['silentgems:sapphire', 'iceandfire:sapphire_gem']],
		['irons_jewelry:topaz',           ['silentgems:topaz']],
		['irons_jewelry:peridot',         ['silentgems:peridot']],
		['irons_jewelry:garnet',          ['silentgems:garnet']],
		['silentgems:silver_ingot',       ['iceandfire:silver_ingot', 'occultism:silver_ingot']],
		['silentgems:silver_nugget',      ['iceandfire:silver_nugget', 'occultism:silver_nugget']],
		['silentgems:raw_silver',         ['iceandfire:raw_silver', 'occultism:raw_silver']],
		['tfmg:steel_ingot',              ['stellaris:steel_ingot', 'createbigcannons:steel_ingot']],
		['tfmg:steel_nugget',             ['stellaris:steel_nugget', 'createbigcannons:steel_scrap']],
		['tfmg:cast_iron_ingot',          ['createbigcannons:cast_iron_ingot']],
		['tfmg:cast_iron_nugget',         ['createbigcannons:cast_iron_nugget']],
		['silentgear:bronze_ingot',       ['createbigcannons:bronze_ingot']],
		['create:copper_nugget',          ['iceandfire:copper_nugget']],
		['create:powdered_obsidian',      ['occultism:obsidian_dust']]
	];
	let count = 0;
	groups.forEach(([winner, losers]) => {
		losers.forEach(loser => {
			// KubeJS 2101.7.x API：replaceInput/replaceOutput 均为 (过滤器, 旧, 新)
			event.replaceInput('*', loser, winner);
			event.replaceOutput('*', loser, winner);
			// 断产出：删除产物为被统一物品的配方，防止 JEI 出现重复条目
			event.remove({ output: loser });
			count++;
		});
	});
	console.log('[ore_item_unify] 已对 ' + count + ' 种物品完成配方层统一并移除其产出配方');
});
