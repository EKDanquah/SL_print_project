import { APIS, BASE_ROUT } from "../app_constants"
import axios from "axios"
import { AgentType, CustomerType, PrintJobsType } from "../schema/schema"

export async function addAgent({ data, token }: { data: AgentType, token?: string }) {

    return axios({
        url: `${BASE_ROUT}/${APIS.Listing}/addAgent`,
        method: "POST",
        data
    })
}

export async function addConsumer({ data }: { data: CustomerType }) {
    return axios({
        url: `${BASE_ROUT}/${APIS.Listing}/addConsumer`,
        method: "POST",
        data
    })
}


export async function getAgents() {
    let res = await axios({
        url: `${BASE_ROUT}/${APIS.Listing}/getAgents`,
        method: "GET",
    })
    return res.data.agent as AgentType[];
}


export async function getConsumers() {
    let res = await axios({
        url: `${BASE_ROUT}/${APIS.Listing}/getConsumers`,
        method: "GET",
    })
    return res.data.consumer as CustomerType[]
}

export async function addPrintJobs({ data }: { data: PrintJobsType }) {
    return await axios({
        url: `${BASE_ROUT}/${APIS.Listing}/addPrintJobs`,
        method: "POST",
        data,
    })
}
