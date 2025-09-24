export default function About() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">About / Contact</h1>
      <p className="mt-4 text-gray-700">This demo scrapes World of Books and stores data in a backend. For questions, email: you@yourdomain.com</p>

      <section className="mt-6">
        <h2 className="font-semibold">Contact</h2>
        <form action="/api/contact" method="post" className="space-y-3 mt-3">
          <label className="block">
            <span className="text-sm">Name</span>
            <input name="name" className="mt-1 block w-full border rounded p-2" />
          </label>
          <label className="block">
            <span className="text-sm">Message</span>
            <textarea name="message" className="mt-1 block w-full border rounded p-2" />
          </label>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
        </form>
      </section>
    </main>
  );
}
