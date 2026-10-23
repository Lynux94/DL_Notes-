// Registry of all lessons. The home page and the prev/next links read from here.
// To add a lesson: add an entry, set status to "ready", and give it a path (relative to docs/).
window.DL = window.DL || {};
DL.TRACKS = [
  { id: "A", title: "Track A — Foundations" },
  { id: "B", title: "Track B — Architectures" },
  { id: "C", title: "Track C — Generative & Modern AI" },
  { id: "D", title: "Track D — Papers" },
];
DL.LESSONS = [
  { id: "01-gradient-descent", track: "A", status: "ready", path: "lessons/01-gradient-descent/",
    title: "Linear Regression & Gradient Descent",
    summary: "How a model learns: guess a line, measure the error, walk downhill." },
  { id: "02-logistic-regression", track: "A", status: "planned", title: "Logistic Regression & Classification" },
  { id: "03-neuron", track: "A", status: "planned", title: "The Perceptron and the Neuron" },
  { id: "04-mlp", track: "A", status: "planned", title: "Multi-Layer Perceptrons & Activations" },
  { id: "05-backprop", track: "A", status: "planned", title: "Backpropagation" },
  { id: "06-optimisers", track: "A", status: "planned", title: "Optimisers: SGD, Momentum, Adam" },
  { id: "07-regularisation", track: "A", status: "planned", title: "Overfitting & Regularisation" },
  { id: "08-cnn", track: "B", status: "planned", title: "Convolutional Neural Networks" },
  { id: "09-rnn", track: "B", status: "planned", title: "RNNs, LSTM & GRU" },
  { id: "10-attention", track: "B", status: "planned", title: "The Attention Mechanism" },
  { id: "11-transformer", track: "B", status: "planned", title: "Transformers" },
  { id: "12-embeddings", track: "B", status: "planned", title: "Embeddings & Tokenisation" },
  { id: "13-vae", track: "C", status: "planned", title: "Autoencoders & VAEs" },
  { id: "14-gan", track: "C", status: "planned", title: "GANs" },
  { id: "15-diffusion", track: "C", status: "planned", title: "Diffusion Models" },
  { id: "16-llm", track: "C", status: "planned", title: "Large Language Models" },
];
