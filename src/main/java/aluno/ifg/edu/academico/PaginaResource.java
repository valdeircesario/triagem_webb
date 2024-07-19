package aluno.ifg.edu.academico;


import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;


@Path("/pagina")
public class PaginaResource {

    @Inject
    Template PaginaInicial;

    @Inject
    Template Login;

    @Inject
    Template Cadastrar;

    @Inject
    Template Triagem;

    @Inject
    Template Usuario;

    @GET
    @Path("PaginaInicial")
    public TemplateInstance paginaInicial() {
        return PaginaInicial.instance();


    }

    @GET
    @Path("Login")
    public TemplateInstance Login() {
        return Login.instance();
    }

    @GET
    @Path("Cadastrar")
    public TemplateInstance Cadastrar() {
        return Cadastrar.instance();
    }

    @GET
    @Path("Triagem")
    public TemplateInstance Triagem(){
        return Triagem.instance();
    }
    @GET
    @Path("Usuario")
    public TemplateInstance Usuario(){
        return Usuario.instance();
    }
}

