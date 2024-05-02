
import universities from "./world_universities_list.json"
const nigerian_universities = universities.filter(it => it.alpha_two_code === "NG")
export default nigerian_universities