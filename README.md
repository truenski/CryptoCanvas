# Base para os projetos Get Hash

Já está configurado no ESLint:
 - Ordenação de forma automatica dos imports
  - Prettier
  - Remoção de imports/variaveis não utilizados (não se assuste se caso você salvar um arquivo e deletar todos os imports ou variaveis que não estão sendo usados)
  
  
 Por favor: não ignore os erros do ESLint, tente resolver TODOS, e so em último caso ignore.
 
 P.S: Se precisar que adicione alguma regra, abra uma PR.
 
 ---
 
 # Pastas
 ##  _components_
 Ficará todos os nossos componentes e deverá seguir a seguinte estrutura:
   - Um arquivo index.tsx
   - Um arquivo styles.module.scss (dessa forma)
   
   OPCIONAL: se caso necessário, poderá criar outras pastas dentro para organizar components; como por exemplo, organizar components de acordo com a Página, exemplo:
   
 __Página Dashboard__
 
 
  Components > _Dashboard (ou o nome da página)_ > Button > index.tsx e styles.module.scss
  
  Components > _Dashboard (ou o nome da página)_ > Hero > index.tsx e styles.module.scss
  
  * Lembrando que só poderá usar esses components a página Dashboard, caso contrário, crie o component fora dessa pasta Dashboard (ou do nome da pasta que você está utilizando.
  * Nome das pastas devem seguir o PascalCase 
  
---

##  _services_ 
Ficará arquivos de requisção para a API (em breve será estruturado para já vir pré-configurado)

##  _contexts_
 Ficará todos os nossos contextos (ContextAPI)

##  _hocs_
  Ficará todos os nossos components de ordem superior (High Order Component's)

## _hooks_
  Ficará todas os nossos hooks customizados. Inclusive, os hooks dos contextos deverão ser colocados nessa pasta.

## pages
  Ficará todas as nossas páginas.

##  _styles_ 
Ficará estilos globais e estilos da páginas. 

  * O nome dos arquivos de estilo de cada página deverá seguir está nomeclatura (nome da página).module.scss

* __Exemplo__: dashboard.module.scss (aqui já podemos usar o padrão de camelCase)




   
 
 
  
  
