import {
    atom,
    selector
} from 'recoil';
import dayjs from 'dayjs'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const tokenAtom = atom({
    key:`tokenAtom`,
    default: undefined,
    effects_UNSTABLE: [persistAtom]
})

const subscriberAtom = atom({
    key:'subscriber',
    default:undefined,
    effects_UNSTABLE: [persistAtom]
})

const filterTipoAtom = atom({
    key:'filterTipo',
    default:'all'
})

// Busca por perído
const dateRangeAtom = atom({
    key:'dateRange',
    default:[
        dayjs().startOf('month').toDate(),
        dayjs().toDate()
    ]
})
    
export { tokenAtom, subscriberAtom, filterTipoAtom, dateRangeAtom }
