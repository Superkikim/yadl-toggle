### 🇪🇸 Español (es-ES)

**Dark Light System Toggle**

Cambia entre el modo oscuro, claro o el esquema de color del sistema con un solo clic — o usa Ctrl+Mayús+L.  
El icono refleja el modo actual y una ventana emergente confirma brevemente la selección.

**Para Firefox versión ≥ 95**

**¿Por qué este?**
- **3 modos:** oscuro, claro y sistema (sigue la configuración de tu OS) — la mayoría de complementos similares solo ofrecen 2
- **API nativa de Firefox** (`overrideContentColorScheme`) — sin inyección CSS, funciona de forma fiable en todos los sitios
- **Cero permisos invasivos** — solo `storage` y `browserSettings`, nada más

**⚠️ Nota importante**  
Este complemento solo afecta a los sitios web que admiten tanto temas oscuros como claros utilizando tecnología web estándar.  
Si un sitio no admite el modo oscuro, esta extensión no puede aplicarlo por la fuerza.

Los desarrolladores pueden implementar ambos temas. Si no lo hacen, la extensión no puede compensarlo.  
No hay una forma fiable de detectarlo con antelación. Si el interruptor no tiene efecto, significa que el sitio no lo admite.  
**Dirija su frustración en la dirección adecuada.**

**Complemento mínimo**  
Este es el complemento más simple posible con los permisos mínimos necesarios.

Al hacer clic en el icono en la barra de herramientas, se alterna la preferencia de esquema de color del contenido del navegador entre:

- colores oscuros
- colores claros
- colores del sistema (oscuros o claros)

Puede habilitar o deshabilitar los valores del ciclo desde la configuración del complemento.

Una pequeña ventana emergente confirma brevemente el modo seleccionado. Aparece después del clic y se cierra automáticamente tras un segundo.

**Compatibilidad con sitios web**  
Este complemento depende de que los sitios web tengan sus propias hojas de estilo para temas claros y oscuros, como DuckDuckGo.  
Cada vez más sitios ofrecen estos esquemas, aunque algunos como Google, GitHub o StackOverflow pueden requerir ajustes manuales para heredar los colores del navegador.

## Licencia y créditos

Este proyecto está bajo licencia MIT.  
Basado en [Toggle Dark Mode](https://github.com/Cimbali/toggle-dark-mode) de Cimbali, originalmente licenciado bajo WTFPL.

---
*¿Te resulta útil? Deja una valoración ⭐ — ¡realmente ayuda!*
