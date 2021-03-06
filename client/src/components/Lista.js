import React from 'react'

class Lista extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={'listaurl':[], 'listaCount':[]};
        this.llenarLista = this.llenarLista.bind(this);
        this.actualizar = this.actualizar.bind(this);
    }
    componentDidMount()
    {
        this.llenarLista();
    }
    seleccion(url)
    {
        console.log("url seleccionado", url);
        this.props.callback(url)
    }
    llenarLista()
    {
    let listaUrl = []
    let listaCount =[]
    fetch("https://datosgov.herokuapp.com/historial/consulta")
    .then(res => res.json())
    .then(data => {
        if(data!=null)
        {
        data.forEach(function(element){
        listaUrl.push(element['_id']+"("+element['count']+")");
        listaCount.push(element['count'])
        })
        this.actualizar(listaUrl);
        }
    });
    }
    actualizar(lista)
    {
      this.setState({'listaurl':lista});
    }

    render()
    {
    
     return(<div>
         <br></br>
         <br></br>
         <h2>Historial De Búsqueda</h2>
         {this.state.listaurl.map((url,i)=> <div key={i} id={url} onClick={()=>this.seleccion(url)}>{url}</div>)}
         
     </div>)
    }

}
export default Lista