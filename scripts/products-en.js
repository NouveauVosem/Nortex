export const products = [
  {
  name: 'Welding machine MIG 250P',
  id: 1,
  price: '1890',
  img: [
    './assets/img/products/mig250p-1.jpg',
    './assets/img/products/mig250p-2.jpg',
    './assets/img/products/mig250p-3.jpg',
    './assets/img/products/mig250p-4.jpg',
    './assets/img/products/mig250p-4.jpg',
    './assets/img/products/mig250p-4.jpg',
  ],
  power: '230',
  efficiency: '80',
  electrodeDiameterMax: '5',
  shortDescription: `
Maximum working current: 160 A (MIG), 140 A (MMA)<br>
Operating voltage: 230 V (1 phase)<br>
Electrode diameter: 1.6 – 4.0 mm<br>
Welding wire diameter: 0.8 – 1.0 mm<br>
  `,
  fullDescription: 
`<b>MIG 250P</b> — an inverter semi-automatic welding machine by Nortex, designed for MIG/MAG and MMA welding. Suitable for both professional and household use. Features a digital display and simple interface for easy welding parameter control.<br><br>

This welding machine is made using modern inverter technology. Thanks to high-efficiency IGBT components and PWM technology, the inverter converts rectified AC 50/60 Hz voltage to a high-frequency 20 kHz voltage, then steps it down and rectifies it again to ensure stable welding.<br><br>
            
The control panel is simple and understandable even for beginner welders. It has a digital display to show welding parameters and operation codes. Mode selection is done via buttons, and welding parameters are adjusted with a rotary knob. Built-in overload protection. The forced cooling system dissipates heat inside the machine with minimal airflow over sensitive electronic components. This design allows effective cooling and prolongs equipment life. Powered from a household 230 V (1 phase) network.<br>

<p><b>Standard features:</b></p>
<ul class="box-bullets">
  <li>Manual arc welding (MMA)</li>
  <li>Arc welding with melting electrode (MIG/MAG)</li>
  <li>Power 250A</li>
  <li>Main equipment advantages:</li>
</ul>
<p><b>Main equipment advantages:</b></p>
<ul class="box-bullets">
  <li>IGBT inverter technology, stable current control, high-quality welding, and reliable operation;</li>
  <li>Closed-loop feedback, constant output voltage, wide input voltage range (±15%);</li>
  <li>Control via electronic reactor — stable arc, minimal spatter, deep penetration, and quality weld seam;</li>
  <li>Slow wire feed during arc ignition, automatic removal of wire tip ball after welding, easy restart;</li>
  <li>Suitable for welding parts from 0.8 mm thick;</li>
  <li>Compact and durable case with quality ventilation</li>
</ul>
<p><b>Includes:</b></p>
<ul class="box-bullets">
  <li>Nortex MIG 250P machine (Z25123) - 1 pc.</li>
  <li>User manual (passport) - 1 pc.</li>
</ul>`,
  parameters: [
    { label: "Model", value: "MIG 250P" },
    { label: "Welding type", value: "MIG/MAG, MMA" },
    { label: "Welding current range (MIG)", value: "60A / 17V – 160A / 22V" },
    { label: "Power supply", value: "220 V / 50–60 Hz" },
    { label: "Welding current range (MMA)", value: "30A / 21.2V – 140A / 25.6V" },
    { label: "Duty cycle", value: "<br>MIG: 60% at 160A, 100% at 124A<br>MMA: 60% at 140A, 100% at 119A" },
    { label: "Max current", value: "28A" },
    { label: "Protection class", value: "IP21S" },
    { label: "Insulation", value: "F" },
    { label: "No-load output voltage", value: "56V" },
    { label: "Torch connection", value: "standard Euro connector" },
    { label: "Additional", value: "digital display, mode switch button, AC 36V sockets" },
  ]
},
{
  name: 'Welding machine MIG 250',
  id: 2,
  price: '1890',
  img: ['./assets/img/products/mig250-1.jpg'],
  power: '230',
  efficiency: '80',
  electrodeDiameterMax: '5',
  shortDescription: `
Maximum working current: 160 A (MIG), 140 A (MMA)<br>
Operating voltage: 230 V (1 phase)<br>
Electrode diameter: 1.6 – 4.0 mm<br>
Welding wire diameter: 0.8 – 1.0 mm<br>
  `,
  fullDescription: 
`<b>MIG 250Pb</b> — an inverter semi-automatic welding machine by Nortex, designed for MIG/MAG and MMA welding. Suitable for both professional and household use. Features a digital display and simple interface for easy welding parameter control.<br><br>  

This welding machine is made using modern inverter technology. Thanks to high-efficiency IGBT components and PWM technology, the inverter converts rectified AC 50/60 Hz voltage to a high-frequency 20 kHz voltage, then steps it down and rectifies it again to ensure stable welding.<br><br>
              
The control panel is simple and understandable even for beginner welders. It has a digital display to show welding parameters and operation codes. Mode selection is done via buttons, and welding parameters are adjusted with a rotary knob. Built-in overload protection. The forced cooling system dissipates heat inside the machine with minimal airflow over sensitive electronic components. This design allows effective cooling and prolongs equipment life. Powered from a household 230 V (1 phase) network.<br>

<p><b>Standard features:</b></p>
<ul class="box-bullets">
  <li>Manual arc welding (MMA)</li>
  <li>Arc welding with melting electrode (MIG/MAG)</li>
  <li>Power 250A</li>
  <li>Main equipment advantages:</li>
</ul>
<p><b>Main equipment advantages:</b></p>
<ul class="box-bullets">
  <li>IGBT inverter technology, stable current control, high-quality welding, and reliable operation;</li>
  <li>Closed-loop feedback, constant output voltage, wide input voltage range (±15%);</li>
  <li>Control via electronic reactor — stable arc, minimal spatter, deep penetration, and quality weld seam;</li>
  <li>Slow wire feed during arc ignition, automatic removal of wire tip ball after welding, easy restart;</li>
  <li>Suitable for welding parts from 0.8 mm thick;</li>
  <li>Compact and durable case with quality ventilation</li>
</ul>
<p><b>Includes:</b></p>
<ul class="box-bullets">
  <li>Nortex MIG 250P machine (Z25123) - 1 pc.</li>
  <li>User manual (passport) - 1 pc.</li>
</ul>`,
  parameters: [
    { label: "Model", value: "Nortex MIG 250" },
    { label: "Serial number", value: "241127102106" },
    { label: "Welding mode (MIG)", value: "60A / 17V – 60A / 22V" },
    { label: "Welding mode (MMA)", value: "30A / 21.2V – 140A / 25.6V" },
    { label: "Open circuit voltage (U₀)", value: "56V" },
    { label: "Duty cycle", value: `<br/>
      MIG: 60% at 160A, 100% at 124A<br>
      MMA: 60% at 140A, 100% at 108A
    ` },
    { label: "Operating voltage (MIG)", value: "22V / 20.2V" },
    { label: "Operating voltage (MMA)", value: "25.5V / 24V" },
    { label: "Input voltage (U₁)", value: "220V" },
    { label: "Max current (I₁max)", value: "26A" },
    { label: "Fuse current (I₁eff)", value: "20A" },
    { label: "Power supply", value: "1 phase, 220 V ±15 %, 50/60 Hz" },
    { label: "Protection", value: "IP21S" },
    { label: "Insulation class", value: "F" }
  ]
},
{ 
  name: 'Wire feeder',
  id: 3,
  price: '1890',
  img: [
    './assets/img/products/wireHolder-1.jpg',
    './assets/img/products/wireHolder-2.jpg',
    './assets/img/products/wireHolder-1.jpg'
  ],
  power: '230',
  efficiency: '80',
  electrodeDiameterMax: '5',
  shortDescription: `
Maximum working current: 100 A<br>
Operating voltage: 230 V (1 phase)<br>
Purpose: welding wire feeding<br>
  `,
  fullDescription: `
<b>Wire feeder</b> — auxiliary equipment for stable feeding of welding wire when working with MIG/MAG welding machines.<br><br>
It has a sturdy case, simple design, and easy connection. Suitable for household and professional use.<br><br>
<p><b>Includes:</b></p>
<ul class="box-bullets">
  <li>Wire feeder - 1 pc.</li>
  <li>Instruction manual - 1 pc.</li>
</ul>
  `,
  parameters: [
    { label: "Model", value: "Wire Feeder 1" },
    { label: "Purpose", value: "Welding wire feeding" },
    { label: "Power supply", value: "230 V" },
    { label: "Protection class", value: "IP21" }
  ]
},
{ 
  name: 'Inverter plasma cutter Nortex CUT-80 (80A)',
  id: 4,
  price: '1890',
  img: [
    './assets/img/products/cut-80-1.jpg',
    './assets/img/products/cut-80-2.jpg',
    './assets/img/products/cut-80-3.jpg'
  ],
  power: '230',
  efficiency: '80',
  electrodeDiameterMax: '5',
  shortDescription: `
Maximum cutting current: 80 A<br>
Operating voltage: 230 V (1 phase)<br>
Cutting thickness: up to 20 mm<br>
  `,
  fullDescription: `
<b>Nortex CUT-80</b> — inverter plasma cutter for precise and fast metal cutting.<br><br>
Works with various metals: steel, stainless steel, aluminum, copper.<br>
Features a simple interface and overload protection system.<br><br>
<p><b>Includes:</b></p>
<ul class="box-bullets">
  <li>Plasma cutter Nortex CUT-80 - 1 pc.</li>
  <li>Plasma torch - 1 pc.</li>
  <li>Instruction manual - 1 pc.</li>
</ul>
  `,
  parameters: [
    { label: "Model", value: "CUT-80" },
    { label: "Max current", value: "80A" },
    { label: "Cutting thickness", value: "up to 20 mm" },
    { label: "Power supply", value: "230 V" }
  ]
},
{ 
  name: 'TIG welding machine TIG200P AC/DC',
  id: 5,
  price: '1890',
  img: [
    './assets/img/products/tig200p-1.jpg',
    './assets/img/products/tig200p-2.jpg',
    './assets/img/products/tig200p-3.jpg',
    './assets/img/products/tig200p-4.jpg',
  ],
  power: '230',
  efficiency: '80',
  electrodeDiameterMax: '5',
  shortDescription: `
Maximum working current: 200 A<br>
Operating voltage: 230 V (1 phase)<br>
Welding type: TIG AC/DC<br>
  `,
  fullDescription: `
<b>TIG200P AC/DC</b> — argon arc inverter welding machine for precise welding of ferrous and non-ferrous metals.<br><br>
Suitable for aluminum, stainless steel, titanium, and other metals.<br>
Has pulse welding function and arc parameter adjustment.<br><br>
<p><b>Includes:</b></p>
<ul class="box-bullets">
  <li>TIG200P AC/DC welding machine - 1 pc.</li>
  <li>TIG torch - 1 pc.</li>
  <li>Instruction manual - 1 pc.</li>
</ul>
  `,
  parameters: [
    { label: "Model", value: "TIG200P AC/DC" },
    { label: "Welding type", value: "TIG AC/DC, MMA" },
    { label: "Current range", value: "10–200A" },
    { label: "Power supply", value: "230 V" }
  ]
}


  
];