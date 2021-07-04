import React from 'react'
import { ResponsivePie } from '@nivo/pie'

function Grafico(props) {
    return (
        <ResponsivePie
            data={[
                {
                    "id": "acertos",
                    "label": "acertos",
                    "value": props.acertos,
                    "color": "hsla(100, 67%, 64%, 1)"
                },
                {
                    "id": "erros",
                    "label": "erros",
                    "value": props.erros,
                    "color": "hsla(0, 55%, 52%, 1)"
                }
            ]}
            margin={{
                top: 40,
                right: 80,
                bottom: 80,
                left: 80
            }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default Grafico


