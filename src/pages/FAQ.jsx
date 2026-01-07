import Breadcrumb from '../components/ui/Breadcrumb'

function FAQ() {
  return (
    <main className="container page">
      <Breadcrumb
        items={[
          { href: '/', label: 'Ana səhifə' },
          { label: 'FAQ' }
        ]}
      />
      <h1>FAQ</h1>
      <p>Tez-tez verilən suallar və cavablar burada olacaq.</p>
    </main>
  )
}

export default FAQ


