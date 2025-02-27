type APIResponse<T> = {
    status: 'success' | 'error', 
    data?: T extends {error: string} ? never : T,
    error?: T extends {error: string} ? string :never,
}; 

type ReadOnlyUser = DeepReadOnly<User>; 
type ErrorMessage = ExtractError<typeof errorResponse>; 

type DeepReadOnly<T> = {
   readonly [key in keyof T]?: T[key] extends object ? DeepReadOnly<T[key]> : T[key]
};

type ExtractError<T> = T extends {error:infer E} ? E : never;

function fetchAPI<T>(url:string) : Promise<APIResponse<T>>{ 
    return new Promise( (resolve, reject) =>{
        setTimeout(()=>{
            if (Math.random() > 0.5){
                resolve({
                        status:"success", 
                        data: {id:1, name:"Chirath"}
                    } as APIResponse<T>
                );
            }else{
                reject({
                    status:"error",
                    error:"Something went wrong" 
                } as APIResponse<T>);
            }
        }, 1000);
    });
}


type User = { id: number; name: string };

// ✅ Success case should have data but no error
const successResponse: APIResponse<User> = {
  status: "success",
  data: { id: 1, name: "Alice" },
};

// ❌ Should not allow error in success response
const invalidSuccessResponse: APIResponse<User> = {
  status: "success",
  data: { id: 1, name: "Alice" },
  error: "This should not be allowed", // Type error
};

// ✅ Error case should have error but no data
const errorResponse: APIResponse<{ error: string }> = {
  status: "error",
  error: "Invalid request",
};

// ❌ Should not allow data in error response
const invalidErrorResponse: APIResponse<{ error: string }> = {
  status: "error",
  data: { id: 1, name: "Alice" }, // Type error
};


type TestObject = {
  a: number;
  b: {
    c: string;
    d: {
      e: boolean;
    };
  };
};

type ReadonlyTestObject = DeepReadOnly<TestObject>;

const obj: ReadonlyTestObject = {
  a: 42,
  b: {
    c: "Hello",
    d: { e: true },
  },
};

// ❌ Should not allow modification (Type errors expected)
obj.a = 50; // Error
obj.b.c = "World"; // Error
obj.b.d.e = false; // Error
