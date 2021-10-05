import axios from "axios";
import addSupplier from "../forms/addSupplier";


var mySingleton = (function () {

    let instance;

    async function init() {

            let policyOnes;
            let current;

            await axios.get(`http://localhost:8080/api/policyOnes`)
                .then(response => {
                     policyOnes = response.data ;
                }).then(()=>{
                    console.log(this.state.policyOnes);
                })

            if(this.state.policyOnes.length > 0){
                current = policyOnes[0].policyOnePrice;
            }

            let done ={
                policyOnes1:policyOnes,
                current1:current
            }

            return done;
    }


    return {

        getInstance: function () {

            if ( !instance ) {
                instance = init();
            }

            return instance;
        }

    };

})();


export default mySingleton;