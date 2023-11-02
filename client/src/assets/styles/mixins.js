export const flex = ({ align = 'center', justify = 'center', direction = 'row', gap = 0 }) => ({
	'flex-direction': direction,
	display: 'flex',
	alignItems: align,
	justifyContent: justify,
	gap: `${gap}px`,
 });