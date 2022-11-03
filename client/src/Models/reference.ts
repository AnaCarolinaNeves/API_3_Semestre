import { UnitMeasurement } from "../Enuns/enuns";
import Aircraft from "./aircraft";
import FatorCalculo from "./fator";
import Table from "./table";

export default class Reference extends FatorCalculo{

    private aircraft: Aircraft;
    private table: Table;
    constructor(aircraft: Aircraft,temGelo: boolean, BRK: number, table: Table){
        super();
        this.temGelo = temGelo;
        this.BRK = BRK;
        this.aircraft = aircraft;
        this.table = table;
    }

    public converterSistema(unitMeasurement: UnitMeasurement): void {
        if(this.unidadeMedida !== unitMeasurement){
            this.valor = this.valorInput / 1.825
        }else{
            this.valor = this.valorInput;
        }
    }

    public calcular(): number {
        if(this.temGelo){
            return this.valor + this.table.refWithIce
        } else {
            return this.valor + this.table.refWithouIce
        }
    }
}