document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA PARTE 1: DIFERENCIACIÓN NUMÉRICA ---
    const btnCalcularDif = document.getElementById('btnCalcularDiferenciacion');
    const divResultDif = document.getElementById('diferenciacionResult');

    btnCalcularDif.addEventListener('click', () => {
        // Recuperar los datos desde las columnas
        const v1_ant = parseFloat(document.getElementById('t_ant').value);
        const v2_ant = parseFloat(document.getElementById('ram_ant').value);
        
        const v1_est = parseFloat(document.getElementById('t_est').value);
        const v2_est = parseFloat(document.getElementById('ram_est').value);
        
        const v1_sig = parseFloat(document.getElementById('t_sig').value);
        const v2_sig = parseFloat(document.getElementById('ram_sig').value);
        
        const eval_v1 = parseFloat(document.getElementById('eval_t').value);

        // Tamaños de paso h
        const h_adelante = v1_sig - v1_est;
        const h_atras = v1_est - v1_ant;
        const h_promedio = (h_adelante + h_atras) / 2;

        // Validación simple para evitar divisiones inválidas por cero
        if (h_adelante === 0 || h_atras === 0 || h_promedio === 0 || isNaN(h_adelante) || isNaN(h_atras)) {
            alert("Error matemático: La diferencia entre los valores de la columna 1 no puede ser cero.");
            return;
        }

        const difAdelante = (v2_sig - v2_est) / h_adelante;
        const difAtras = (v2_est - v2_ant) / h_atras;
        const difCentrada = (v2_sig - v2_ant) / (2 * h_promedio);

        // Inyectar resultados estructurados
        divResultDif.innerHTML = `
            <div style="padding: 10px; border-bottom: 2px solid #e5e7eb; margin-bottom: 15px;">
                <h2 style="color: #111827; font-size: 1.3rem; margin-bottom: 5px;">Reporte Técnico: Diferenciación Numérica</h2>
                <p style="font-size: 0.85rem; color: #4b5563;">Evaluado para Valor 1 = <strong>${eval_v1}</strong></p>
            </div>

            <div class="step-box">
                <h3>1. Esquema de Diferencia hacia Adelante</h3>
                <p class="formula">Ecuación: [ f(x + h) - f(x) ] / h (Paso h = ${h_adelante.toFixed(4)})</p>
                <pre class="code-block">
f'(${eval_v1}) ≈ ( ${v2_sig} - ${v2_est} ) / ${h_adelante.toFixed(4)}
f'(${eval_v1}) ≈ ${ (v2_sig - v2_est).toFixed(4) } / ${h_adelante.toFixed(4)}
<strong class="text-success">Tasa aproximada: ${difAdelante.toFixed(4)}</strong></pre>
            </div>

            <div class="step-box" style="margin-top: 15px;">
                <h3>2. Esquema de Diferencia hacia Atrás</h3>
                <p class="formula">Ecuación: [ f(x) - f(x - h) ] / h (Paso h = ${h_atras.toFixed(4)})</p>
                <pre class="code-block">
f'(${eval_v1}) ≈ ( ${v2_est} - ${v2_ant} ) / ${h_atras.toFixed(4)}
f'(${eval_v1}) ≈ ${ (v2_est - v2_ant).toFixed(4) } / ${h_atras.toFixed(4)}
<strong class="text-success">Tasa aproximada: ${difAtras.toFixed(4)}</strong></pre>
            </div>

            <div class="step-box" style="margin-top: 15px;">
                <h3>3. Esquema de Diferencia Centrada</h3>
                <p class="formula">Ecuación: [ f(x + h) - f(x - h) ] / 2h (Paso h promedio = ${h_promedio.toFixed(4)})</p>
                <pre class="code-block">
f'(${eval_v1}) ≈ ( ${v2_sig} - ${v2_ant} ) / ( 2 * ${h_promedio.toFixed(4)} )
f'(${eval_v1}) ≈ ${ (v2_sig - v2_ant).toFixed(4) } / ${ (2 * h_promedio).toFixed(4) }
<strong class="text-success">Tasa aproximada: ${difCentrada.toFixed(4)}</strong></pre>
            </div>
        `;
        divResultDif.style.display = 'flex';
    });


    // --- LÓGICA PARTE 2: CUADRATURA DE GAUSS ---
    const selectIntegral = document.getElementById('integralSelect');
    const inputA = document.getElementById('coefA');
    const inputB = document.getElementById('coefB');
    const inputC = document.getElementById('coefC');
    const btnCalcularGauss = document.getElementById('btnCalcularGauss');
    const divResultGauss = document.getElementById('gaussResult');

    const x0 = -1 / Math.sqrt(3);
    const x1 = 1 / Math.sqrt(3);

    const predefinidos = {
        a: { a: 1, b: 0, c: 1 },
        b: { a: 3, b: 0, c: 2 },
        c: { a: 2, b: 4, c: 1 }
    };

    selectIntegral.addEventListener('change', () => {
        const seleccion = selectIntegral.value;
        if (seleccion !== 'custom') {
            inputA.value = predefinidos[seleccion].a;
            inputB.value = predefinidos[seleccion].b;
            inputC.value = predefinidos[seleccion].c;
        }
    });

    btnCalcularGauss.addEventListener('click', () => {
        const A = parseFloat(inputA.value) || 0;
        const B = parseFloat(inputB.value) || 0;
        const C = parseFloat(inputC.value) || 0;

        const evaluarFunción = (x) => A * Math.pow(x, 2) + B * x + C;
        const formatoTexto = (x) => {
            return `${A ? A + '*(' + x.toFixed(4) + ')²' : ''} ${B >= 0 ? '+ ' + B : '- ' + Math.abs(B)}*(${x.toFixed(4)}) ${C >= 0 ? '+ ' + C : '- ' + Math.abs(C)}`;
        };

        const f_x0 = evaluarFunción(x0);
        const f_x1 = evaluarFunción(x1);
        const resultadoIntegral = f_x0 + f_x1;

        divResultGauss.innerHTML = `
            <div style="padding: 10px; border-bottom: 2px solid #e5e7eb; margin-bottom: 15px;">
                <h2 style="color: #111827; font-size: 1.3rem; margin-bottom: 5px;">Reporte Técnico: Integración por Cuadratura de Gauss</h2>
                <p style="font-size: 0.85rem; color: #4b5563;">Intervalo de integración estándar: <strong>[-1, 1]</strong> | Parámetro de nodos: <strong>n = 2</strong></p>
            </div>
            
            <ol class="dynamic-list">
                <li>
                    <strong>Paso 1: Definición de la estructura del polinomio</strong>
                    <div>f(x) = ${A ? A + 'x²' : ''} ${B >= 0 ? '+ ' + B : '- ' + Math.abs(B)}x ${C >= 0 ? '+ ' + C : '- ' + Math.abs(C)}</div>
                </li>
                <li style="margin-top: 10px;">
                    <strong>Paso 2: Evaluación en nodo inferior (x₀ ≈ -0.57735)</strong>
                    <div>
                        f(-0.57735) = ${formatoTexto(x0)} <br>
                        <span style="color: #4f46e5; font-weight: bold;">f(x₀) = ${f_x0.toFixed(5)}</span>
                    </div>
                </li>
                <li style="margin-top: 10px;">
                    <strong>Paso 3: Evaluación en nodo superior (x₁ ≈ 0.57735)</strong>
                    <div>
                        f(0.57735) = ${formatoTexto(x1)} <br>
                        <span style="color: #4f46e5; font-weight: bold;">f(x₁) = ${f_x1.toFixed(5)}</span>
                    </div>
                </li>
                <li style="margin-top: 10px;">
                    <strong>Paso 4: Suma ponderada de Gauss (w₀ · f(x₀) + w₁ · f(x₁)) donde w = 1</strong>
                    <div>
                        I ≈ 1 · (${f_x0.toFixed(5)}) + 1 · (${f_x1.toFixed(5)}) <br>
                        I ≈ ${f_x0.toFixed(5)} + ${f_x1.toFixed(5)} <br>
                        <strong style="font-size: 1.2rem; color: #059669;">Resultado Exacto de la Integral = ${resultadoIntegral.toFixed(4)}</strong>
                    </div>
                </li>
            </ol>
        `;
        divResultGauss.style.display = 'block';
    });
});