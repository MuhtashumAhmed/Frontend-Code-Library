// Function which have base URL nad make custom Fetch using next js 
// One Main feature in this is having description Algorithm AES


const SECRET_KEY = process.env.NEXT_PUBLIC_AES_SECRET_KEY!;
const IV = process.env.NEXT_PUBLIC_AES_IV!;
export async function apiFetch<T>(
    endpoint: string,
    options: ApiFetchOptions = {}
): Promise<T> {


    const url = `${API_BASE_URL}${endpoint}`;


    const isFormData = options.body instanceof FormData;
    const headers = new Headers(options.headers);


    if (!isFormData && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
    if (options.requireAuth) {
        const token = options.tokenKey
            ? getAllAccessToken(options.tokenKey) //  new token
            : getAccessToken(); // old fallback


        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
    }


    const config: RequestInit = {
        ...options,
        headers,
    };


    if (options.body && !isFormData) {
        config.body = JSON.stringify(options.body);
    }


    const res = await fetch(url, config);


    if (!res.ok) {
        const rawText = await res.text(); // ✅ only ONE read


        let errorData: any = null;


        try {
            errorData = JSON.parse(rawText);


            // 🔐 decrypt error if needed
            if (errorData?.is_encrypted) {
                errorData = decryptResponse(
                    { ciphertext: errorData.ciphertext || errorData.payload },
                    SECRET_KEY,
                    IV
                );
            }
        } catch {
            // not JSON, keep as text
        }


        console.error("FULL API ERROR -from api.ts file :", {
            status: res.status,
            statusText: res.statusText,
            rawText,
            errorData,
        });


        throw new ApiError(
            errorData?.message || rawText || `API Request Failed (${res.status})`,
            res.status,
            errorData || rawText
        );
    }


    //  HANDLE SUCCESS RESPONSE
    let data: any = await res.json();


    if (data?.is_encrypted) {
        data = decryptResponse(
            { ciphertext: data.ciphertext || data.payload },
            SECRET_KEY,
            IV
        );
        console.log(data);
    }


    return data as T;
}
