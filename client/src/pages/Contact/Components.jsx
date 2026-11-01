import { Button } from '../../components/ui/Button/Button';
import { Input } from '../../components/ui/Input/Input';
import { Card } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { Spinner } from '../../components/ui/Spinner/Spinner';
import { Alert } from '../../components/ui/Alert/Alert';


export const Components = () => {

    return (
        <>

            <div style={{ display: 'flex', gap: '1rem', padding: '2rem', flexWrap: 'wrap' }}>
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
            </div>


            <div className="stack" style={{ padding: '2rem', maxWidth: '400px' }}>
                <Input label="Nombre" placeholder="Ingresá tu nombre" />
                <Input label="DNI" required hint="Sin puntos ni guiones" />
                <Input label="Email" type="email" error="El email no es válido" />
                <Input label="Deshabilitado" disabled value="No editable" />
            </div>            


            <div className="stack" style={{ padding: '2rem' }}>
                <Card>
                    <p className="body">Card básica sin header.</p>
                </Card>

                <Card
                    title="Datos personales"
                    subtitle="Información registrada"
                    actions={<Button size="sm" variant="ghost">Editar</Button>}
                    footer={<Button size="sm">Guardar</Button>}
                >
                    <p className="body">Contenido de la card.</p>
                </Card>

                <Card interactive>
                    <h3 className="title">Card interactiva</h3>
                    <p className="body textMuted">Hover para ver elevación.</p>
            </Card>
            </div>



            <div className="stack" style={{ padding: '2rem' }}>
                <div className="flex" style={{ flexWrap: 'wrap' }}>
                    <Badge>Neutral</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="info">Info</Badge>
                </div>

                <div className="flex" style={{ flexWrap: 'wrap' }}>
                    <Badge variant="success" dot>Activo</Badge>
                    <Badge variant="neutral" dot>Inactivo</Badge>
                    <Badge variant="warning" dot>Pendiente</Badge>
                </div>

                <div className="flex" style={{ flexWrap: 'wrap' }}>
                    <Badge size="sm" variant="primary">ADMIN</Badge>
                    <Badge size="sm">CITIZEN</Badge>
                </div>
            </div>           


            <div className="stack" style={{ padding: '2rem' }}>
            <div className="flex" style={{ gap: '2rem', alignItems: 'center' }}>
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
            </div>

            <div className="flex" style={{ gap: '2rem', alignItems: 'center' }}>
                <Spinner color="primary" />
                <Spinner color="neutral" />
                <div style={{ background: 'var(--color-primary)', padding: '1rem', borderRadius: '8px' }}>
                <Spinner color="inverse" />
                </div>
            </div>

            <Spinner centered label="Cargando datos..." />
            </div>       


            <div className="stack" style={{ padding: '2rem' }}>
            <Alert variant="error">No se pudo cargar el perfil.</Alert>
            <Alert variant="error" title="Error de validación">
                El DNI ingresado no es válido.
            </Alert>
            <Alert variant="success" title="Solicitud enviada">
                Tu trámite fue registrado correctamente.
            </Alert>
            <Alert variant="warning" title="Sesión por expirar">
                Tu sesión expira en 5 minutos.
            </Alert>
            <Alert variant="info">Recordá tener tu DNI a mano.</Alert>
            <Alert variant="error" title="Con cierre" onClose={() => alert('cerrar')}>
                Probá el botón ×.
            </Alert>
            </div>            

            <div className="stack" style={{ padding: '2rem' }}>
                <span className="overline">Overline · etiqueta</span>
                <h1 className="display">Display</h1>
                <h2 className="headline">Headline</h2>
                <h3 className="title">Title</h3>
                <h4 className="subtitle">Subtitle</h4>
                <p className="body">Body — este es un párrafo normal de cuerpo.</p>
                <p className="bodyStrong">Body Strong — énfasis.</p>
                <span className="caption">Caption — texto secundario</span>
            </div>

        </>
    )
}