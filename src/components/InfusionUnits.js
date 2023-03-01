export default {
    template: `
        <label v-if="infusion.units < 2">mL</label>
        <label v-else-if="infusion.units < 3">gtt</label>
        <label v-else-if="infusion.units < 4">g</label>
        <label v-else-if="infusion.units < 5">mg</label>
        <label v-else-if="infusion.units < 6">mcg</label>
        <label v-else>u</label>
    `,

    props: {
        infusion: Object
    }
}