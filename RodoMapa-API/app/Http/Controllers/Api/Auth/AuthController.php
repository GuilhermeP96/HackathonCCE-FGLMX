<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'create']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {        
        $credentials = request(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function create(Request $request){
        extract($request->all());
        $documento = isset($documento) ? str_replace([".","/","-"], "", $documento): '';
        if(!empty($name) && !empty($email) && !empty($password) && strlen($documento)>0)
        {
            $verificaUsuario = User::where('email',$email)->where('ic_excluido',1)->first();
            if(empty($verificaUsuario->email))
            {
                User::create([
                    'cd_perfil' => 5,
                    'name' => $name,
                    'email' => $email,
                    'password' => Hash::make($password),
                    'nr_documento' => $documento
                ]);
            }
            else return response()->json([
                'sucesso' => 0,
                'mensagem' => 'Usuário já cadastrado.'
            ], 200);
            return response()->json([
                'sucesso' => 1,
                'mensagem' => 'Usuário cadastrado com sucesso.'
            ], 200);
        }
        else return response()->json(
            [
                'sucesso' => 0,
                'mensagem' => 'Não foi informado todos os parametros obrigatórios'
            ], 200);
        
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        //dd(auth()->user()->perfil());
        return response()->json(auth()->user()->with('perfil:cd_perfil,ds_descricao')->get());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            //'cd_usuario' => auth()->user()->id,
            'usuario' => auth()->user()->name,
            //'email' => auth()->user()->email
        ]);
    }
}
